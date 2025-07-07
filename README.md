# 쇼핑몰 프로젝트

Next.js + TypeScript + Tailwind CSS, Node.js(Express), PostgreSQL을 사용한 온라인 쇼핑몰 프로젝트입니다.

## 기술 스택

### 프론트엔드
- **Next.js 15** - React 기반 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 CSS 프레임워크

### 백엔드
- **Node.js** - JavaScript 런타임
- **Express.js** - 웹 애플리케이션 프레임워크
- **TypeScript** - 타입 안정성
- **PostgreSQL** - 관계형 데이터베이스
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 해시화

## 프로젝트 구조

```
ShoppingMall/
├── frontend/          # Next.js 프론트엔드
│   ├── src/
│   │   └── app/      # App Router 구조
│   └── package.json
├── backend/           # Express.js 백엔드
│   ├── src/
│   │   ├── config/   # 데이터베이스 설정
│   │   ├── middleware/ # 미들웨어
│   │   ├── routes/   # API 라우트
│   │   └── database/ # 데이터베이스 스키마
│   └── package.json
└── README.md
```

## 설치 및 실행

### 1. 데이터베이스 설정

PostgreSQL을 설치하고 데이터베이스를 생성합니다:

```sql
CREATE DATABASE shopping_mall;
```

### 2. 백엔드 설정

```bash
cd backend

# 의존성 설치
npm install

# 환경 변수 설정
cp env.example .env
# .env 파일을 편집하여 데이터베이스 정보를 입력

# 데이터베이스 스키마 생성
# PostgreSQL에 연결하여 src/database/schema.sql 실행

# 개발 서버 실행
npm run dev
```

### 3. 프론트엔드 설정

```bash
cd frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경 변수 설정

### 백엔드 (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shopping_mall
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### 상품
- `GET /api/products` - 상품 목록 조회
- `GET /api/products/:id` - 특정 상품 조회
- `POST /api/products` - 상품 생성 (관리자)
- `PUT /api/products/:id` - 상품 수정 (관리자)
- `DELETE /api/products/:id` - 상품 삭제 (관리자)

### 주문
- `POST /api/orders` - 주문 생성
- `GET /api/orders/my-orders` - 내 주문 목록
- `GET /api/orders/:id` - 특정 주문 조회
- `PATCH /api/orders/:id/status` - 주문 상태 변경 (관리자)

## 주요 기능

### 사용자 기능
- 회원가입/로그인
- 상품 조회 및 검색
- 장바구니 기능
- 주문 및 결제
- 주문 내역 조회

### 관리자 기능
- 상품 관리 (CRUD)
- 주문 상태 관리
- 사용자 관리

## 개발 명령어

### 백엔드
```bash
npm run dev    # 개발 서버 실행
npm run build  # TypeScript 컴파일
npm start      # 프로덕션 서버 실행
```

### 프론트엔드
```bash
npm run dev    # 개발 서버 실행
npm run build  # 프로덕션 빌드
npm start      # 프로덕션 서버 실행
```

## 데이터베이스 스키마

### users 테이블
- id (SERIAL PRIMARY KEY)
- email (VARCHAR, UNIQUE)
- password (VARCHAR)
- name (VARCHAR)
- phone (VARCHAR)
- role (VARCHAR, 'user' 또는 'admin')
- created_at, updated_at (TIMESTAMP)

### products 테이블
- id (SERIAL PRIMARY KEY)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- stock (INTEGER)
- category (VARCHAR)
- image_url (TEXT)
- created_at, updated_at (TIMESTAMP)

### orders 테이블
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER, FOREIGN KEY)
- total_amount (DECIMAL)
- shipping_address (TEXT)
- payment_method (VARCHAR)
- status (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### order_items 테이블
- id (SERIAL PRIMARY KEY)
- order_id (INTEGER, FOREIGN KEY)
- product_id (INTEGER, FOREIGN KEY)
- quantity (INTEGER)
- price (DECIMAL)
- created_at (TIMESTAMP)

## 라이센스

MIT License

## 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 