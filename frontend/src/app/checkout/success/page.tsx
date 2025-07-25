'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useOrders } from '../../../contexts/OrderContext';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const { orders } = useOrders();
  const orderId = searchParams.get('orderId');
  
  // 주문 ID가 있으면 해당 주문을 찾고, 없으면 가장 최근 주문을 사용
  const order = orderId 
    ? orders.find(o => o.id === orderId) 
    : orders[0];

  useEffect(() => {
    // TODO: 결제 완료 이벤트 트래킹 구현
    console.log('결제 완료:', Date.now());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
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
            결제가 완료되었습니다!
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
                <span className="font-medium">{order?.id || `#ORD-${Date.now().toString().slice(-8)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">주문 일시</span>
                <span className="font-medium">
                  {order?.orderDate 
                    ? new Date(order.orderDate).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : new Date().toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">결제 상태</span>
                <span className="text-green-600 font-medium">결제 완료</span>
              </div>
              {order && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 금액</span>
                    <span className="font-medium">{order.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제 수단</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 주문 상품 목록 */}
          {order && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 상품</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">수량: {item.quantity}개</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        {(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 배송 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">배송 정보</h2>
            {order ? (
              <div className="space-y-2">
                <p className="text-gray-600">
                  주문하신 상품은 1-2일 내에 배송 준비가 완료되며,<br />
                  배송 시작 시 SMS로 알려드립니다.
                </p>
                <p className="text-sm text-gray-500">
                  배송지: {order.shippingAddress}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">
                주문하신 상품은 1-2일 내에 배송 준비가 완료되며,<br />
                배송 시작 시 SMS로 알려드립니다.
              </p>
            )}
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