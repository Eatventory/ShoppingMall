'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // TODO: 결제 완료 이벤트 트래킹 구현
    console.log('결제 완료:', Date.now());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">NAMAN MARKET</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-gray-500 hover:text-gray-900">상품</Link>
              <Link href="/cart" className="text-gray-500 hover:text-gray-900">장바구니</Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">로그인</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* 성공 아이콘 */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* 성공 메시지 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            주문이 완료되었습니다!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            주문해주셔서 감사합니다. 주문 내역은 이메일로 발송해드립니다.
          </p>

          {/* 주문 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 정보</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">주문 번호</span>
                <span className="font-medium">#ORD-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">주문 일시</span>
                <span className="font-medium">
                  {new Date().toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 상태</span>
                <span className="text-green-600 font-medium">결제 완료</span>
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">배송 정보</h2>
            <p className="text-gray-600">
              주문하신 상품은 1-2일 내에 배송 준비가 완료되며,<br />
              배송 시작 시 SMS로 알려드립니다.
            </p>
          </div>

          {/* 액션 버튼들 */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block w-full bg-[#14213d] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a2540] transition-colors"
            >
              쇼핑 계속하기
            </Link>
            <Link
              href="/products"
              className="inline-block w-full bg-white text-[#14213d] border border-[#14213d] py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              다른 상품 둘러보기
            </Link>
          </div>

          {/* 추가 정보 */}
          <div className="mt-12 text-sm text-gray-500">
            <p>문의사항이 있으시면 고객센터로 연락해주세요.</p>
            <p className="mt-1">고객센터: 02-1234-5678</p>
          </div>
        </div>
      </main>
    </div>
  );
} 