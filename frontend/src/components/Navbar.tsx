"use client";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-[#14213d] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* 로고 */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight text-mint-400">
          JUNGLE SHOP
        </Link>
        {/* 검색바 */}
        <div className="flex-1 mx-8 max-w-xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="상품, 브랜드, 카테고리 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-2 rounded-full border-none focus:ring-2 focus:ring-mint-400 text-gray-900 placeholder-gray-400"
              style={{ background: '#f8fafc' }}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
        {/* 네비게이션 */}
        <nav className="flex items-center space-x-6">
          <Link to="/wishlist" className={`hover:text-mint-400 font-semibold${location.pathname.startsWith('/wishlist') ? ' text-mint-400' : ''}`}>찜한상품</Link>
          <Link to="/cart" className={`hover:text-mint-400 font-semibold${location.pathname.startsWith('/cart') ? ' text-mint-400' : ''}`}>장바구니</Link>
          <Link to="/orders" className={`hover:text-mint-400 font-semibold${location.pathname.startsWith('/orders') ? ' text-mint-400' : ''}`}>주문조회</Link>
          <Link to="/login" className={`hover:text-mint-400 font-semibold${location.pathname.startsWith('/login') ? ' text-mint-400' : ''}`}>로그인</Link>
          <Link to="/register" className={`hover:text-mint-400 font-semibold${location.pathname.startsWith('/register') ? ' text-mint-400' : ''}`}>회원가입</Link>
        </nav>
      </div>
      {/* 카테고리 바 */}
      <div className="bg-[#1a2540] border-t border-[#2a3550]">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6 h-12 items-center">
          <Link to="/products" className="hover:text-white font-medium">전체</Link>
          <Link to="/products?category=electronics" className="hover:text-white font-medium">전자제품</Link>
          <Link to="/products?category=clothing" className="hover:text-white font-medium">의류</Link>
          <Link to="/products?category=appliances" className="hover:text-white font-medium">가전제품</Link>
          <Link to="/products?category=sports" className="hover:text-white font-medium">스포츠</Link>
          <Link to="/products?category=food" className="hover:text-white font-medium">식품</Link>
          <Link to="/products?category=beauty" className="hover:text-white font-medium">뷰티</Link>
          <Link to="/products?category=kids" className="hover:text-white font-medium">유아동</Link>
          <Link to="/products?category=home" className="hover:text-white font-medium">홈리빙</Link>
          <Link to="/products?category=pet" className="hover:text-white font-medium">반려동물</Link>
        </div>
      </div>
    </header>
  );
} 