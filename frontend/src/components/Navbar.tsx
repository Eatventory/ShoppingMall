"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-[#14213d] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* 로고 */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-mint-400">
          NAMAN MARKET
        </Link>
        {/* 검색바 */}
        <div className="flex-1 mx-8 max-w-xl">
          <input
            type="text"
            placeholder="상품, 브랜드, 카테고리 검색"
            className="w-full px-5 py-2 rounded-full border-none focus:ring-2 focus:ring-mint-400 text-gray-900 placeholder-gray-400"
            style={{ background: '#f8fafc' }}
          />
        </div>
        {/* 네비게이션 */}
        <nav className="flex items-center space-x-6">
          <Link href="/products" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/products') ? ' text-mint-400' : ''}`}>전체상품</Link>
          <Link href="/cart" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/cart') ? ' text-mint-400' : ''}`}>장바구니</Link>
          <Link href="/login" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/login') ? ' text-mint-400' : ''}`}>로그인</Link>
          <Link href="/register" className={`hover:text-mint-400 font-semibold${pathname.startsWith('/register') ? ' text-mint-400' : ''}`}>회원가입</Link>
        </nav>
      </div>
      {/* 카테고리 바 */}
      <div className="bg-[#1a2540] text-mint-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex space-x-6 h-10 items-center">
          <Link href="/products" className="hover:text-white">전체</Link>
          <Link href="/products?category=electronics" className="hover:text-white">전자제품</Link>
          <Link href="/products?category=clothing" className="hover:text-white">의류</Link>
          <Link href="/products?category=appliances" className="hover:text-white">가전제품</Link>
          <Link href="/products?category=sports" className="hover:text-white">스포츠</Link>
          <Link href="/products?category=food" className="hover:text-white">식품</Link>
          <Link href="/products?category=beauty" className="hover:text-white">뷰티</Link>
          <Link href="/products?category=kids" className="hover:text-white">유아동</Link>
          <Link href="/products?category=home" className="hover:text-white">홈리빙</Link>
          <Link href="/products?category=pet" className="hover:text-white">반려동물</Link>
        </div>
      </div>
    </header>
  );
} 