import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database';

const router = express.Router();

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;

    // 이메일 중복 확인
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // 사용자 생성
    const newUser = await pool.query(
      'INSERT INTO users (email, password, name, phone, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, name, role',
      [email, hashedPassword, name, phone, 'user']
    );

    // JWT 토큰 생성
    const token = jwt.sign(
      { 
        id: newUser.rows[0].id, 
        email: newUser.rows[0].email,
        role: newUser.rows[0].role 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: '회원가입이 완료되었습니다.',
      token,
      user: {
        id: newUser.rows[0].id,
        email: newUser.rows[0].email,
        name: newUser.rows[0].name,
        role: newUser.rows[0].role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 사용자 찾기
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // 비밀번호 확인
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    }

    // JWT 토큰 생성
    const token = jwt.sign(
      { 
        id: user.rows[0].id, 
        email: user.rows[0].email,
        role: user.rows[0].role 
      },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: '로그인이 완료되었습니다.',
      token,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        name: user.rows[0].name,
        role: user.rows[0].role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

export default router; 