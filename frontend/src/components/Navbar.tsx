"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="bg-[#14213d] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* 로고 */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-mint-400">
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
          <Link href="/wishlist" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/wishlist') ? ' text-mint-400' : ''}`}>찜한상품</Link>
          <Link href="/cart" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/cart') ? ' text-mint-400' : ''}`}>장바구니</Link>
          <Link href="/orders" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/orders') ? ' text-mint-400' : ''}`}>주문조회</Link>
          <Link href="/login" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/login') ? ' text-mint-400' : ''}`}>로그인</Link>
          <Link href="/register" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/register') ? ' text-mint-400' : ''}`}>회원가입</Link>
        </nav>
      </div>
      {/* 카테고리 바 */}
      <div className="bg-[#1a2540] text-mint-400 text-base">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6 h-12 items-center">
          <Link href="/products" className="hover:text-white font-medium">전체</Link>
          <Link href="/products?category=electronics" className="hover:text-white font-medium">전자제품</Link>
          <Link href="/products?category=clothing" className="hover:text-white font-medium">의류</Link>
          <Link href="/products?category=appliances" className="hover:text-white font-medium">가전제품</Link>
          <Link href="/products?category=sports" className="hover:text-white font-medium">스포츠</Link>
          <Link href="/products?category=food" className="hover:text-white font-medium">식품</Link>
          <Link href="/products?category=beauty" className="hover:text-white font-medium">뷰티</Link>
          <Link href="/products?category=kids" className="hover:text-white font-medium">유아동</Link>
          <Link href="/products?category=home" className="hover:text-white font-medium">홈리빙</Link>
          <Link href="/products?category=pet" className="hover:text-white font-medium">반려동물</Link>
        </div>
      </div>
    </header>
  );
} 