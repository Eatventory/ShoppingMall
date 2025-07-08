import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'shopping_mall',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    console.log('Continuing without database connection for development...');
    // 개발 환경에서는 데이터베이스 연결 실패해도 계속 진행
  }
};

export default pool; 