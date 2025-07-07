import express from 'express';
import pool from '../config/database';
import { authenticateToken, isAdmin } from '../middleware/auth';

const router = express.Router();

// 모든 상품 조회
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];
    let paramCount = 0;

    if (category) {
      paramCount++;
      query += ` AND category = $${paramCount}`;
      params.push(category);
    }

    if (search) {
      paramCount++;
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(Number(limit), offset);

    const result = await pool.query(query, params);
    
    // 전체 개수 조회
    let countQuery = 'SELECT COUNT(*) FROM products WHERE 1=1';
    const countParams: any[] = [];
    paramCount = 0;

    if (category) {
      paramCount++;
      countQuery += ` AND category = $${paramCount}`;
      countParams.push(category);
    }

    if (search) {
      paramCount++;
      countQuery += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      countParams.push(`%${search}%`);
    }

    const countResult = await pool.query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count);

    res.json({
      products: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount,
        totalPages: Math.ceil(totalCount / Number(limit))
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 특정 상품 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 생성 (관리자만)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, description, price, stock, category, image_url } = req.body;
    
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, stock, category, image_url]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 수정 (관리자만)
router.put('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image_url } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5, image_url = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [name, description, price, stock, category, image_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 상품 삭제 (관리자만)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.json({ message: '상품이 삭제되었습니다.' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router; 