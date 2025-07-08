import express from 'express';
import pool from '../config/database';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// 주문 생성
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { items, shipping_address, payment_method } = req.body;
    const userId = (req as any).user.id;

    // 트랜잭션 시작
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // 주문 생성
      const orderResult = await client.query(
        'INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, 0, shipping_address, payment_method, 'pending']
      );

      const orderId = orderResult.rows[0].id;
      let totalAmount = 0;

      // 주문 아이템 생성
      for (const item of items) {
        // 상품 정보 조회
        const productResult = await client.query(
          'SELECT * FROM products WHERE id = $1',
          [item.product_id]
        );

        if (productResult.rows.length === 0) {
          throw new Error(`상품 ID ${item.product_id}를 찾을 수 없습니다.`);
        }

        const product = productResult.rows[0];
        
        if (product.stock < item.quantity) {
          throw new Error(`상품 ${product.name}의 재고가 부족합니다.`);
        }

        // 주문 아이템 생성
        await client.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
          [orderId, item.product_id, item.quantity, product.price]
        );

        // 재고 감소
        await client.query(
          'UPDATE products SET stock = stock - $1 WHERE id = $2',
          [item.quantity, item.product_id]
        );

        totalAmount += product.price * item.quantity;
      }

      // 주문 총액 업데이트
      await client.query(
        'UPDATE orders SET total_amount = $1 WHERE id = $2',
        [totalAmount, orderId]
      );

      await client.query('COMMIT');

      // 완성된 주문 정보 조회
      const finalOrder = await client.query(
        `SELECT o.*, oi.product_id, oi.quantity, oi.price as item_price, p.name as product_name
         FROM orders o
         JOIN order_items oi ON o.id = oi.order_id
         JOIN products p ON oi.product_id = p.id
         WHERE o.id = $1`,
        [orderId]
      );

      res.status(201).json({
        message: '주문이 성공적으로 생성되었습니다.',
        order: finalOrder.rows
      });

    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: (error as Error).message || '서버 오류가 발생했습니다.' });
  }
});

// 사용자 주문 목록 조회
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.id;
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 특정 주문 조회
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const result = await pool.query(
      `SELECT o.*, oi.product_id, oi.quantity, oi.price as item_price, p.name as product_name, p.image_url
       FROM orders o
       JOIN order_items oi ON o.id = oi.order_id
       JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1 AND o.user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 주문 상태 업데이트 (관리자만)
router.patch('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userRole = (req as any).user.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ message: '관리자만 주문 상태를 변경할 수 있습니다.' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router; 