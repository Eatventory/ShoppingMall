'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useOrders } from '../../contexts/OrderContext';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderDate: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

export default function OrdersPage() {
  const { orders } = useOrders();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로딩 시뮬레이션 (실제로는 Context에서 바로 데이터를 가져옴)
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '결제완료';
      case 'processing':
        return '처리중';
      case 'shipped':
        return '배송중';
      case 'delivered':
        return '배송완료';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">주문 내역을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">주문조회</h1>
          <p className="mt-2 text-gray-600">주문하신 상품들의 내역을 확인하세요.</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">주문 내역이 없습니다</h2>
            <p className="text-gray-500 mb-8">첫 주문을 시작해보세요!</p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              쇼핑하러 가기
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow">
                {/* 주문 헤더 */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                      <p className="text-sm text-gray-500">주문일: {order.orderDate}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {order.totalAmount.toLocaleString()}원
                      </p>
                    </div>
                  </div>
                </div>

                {/* 주문 상품들 */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
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

                {/* 주문 정보 */}
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">배송지</p>
                      <p className="font-medium text-gray-900">{order.shippingAddress}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">결제수단</p>
                      <p className="font-medium text-gray-900">{order.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/checkout/success?orderId=${order.id}`}
                      className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      주문 상세 보기
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 