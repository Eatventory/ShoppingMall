'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  discount?: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "무선 블루투스 이어폰",
      price: 89000,
      originalPrice: 120000,
      image: "/sample1.jpg",
      quantity: 1,
      discount: 26
    },
    {
      id: 2,
      name: "면 티셔츠",
      price: 25000,
      originalPrice: 35000,
      image: "/sample3.jpg",
      quantity: 2,
      discount: 29
    },
    {
      id: 3,
      name: "스마트폰 케이스",
      price: 15000,
      image: "/sample2.jpg",
      quantity: 1
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  const shippingFee = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">쇼핑몰</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-gray-500 hover:text-gray-900">상품</Link>
              <Link href="/cart" className="text-indigo-600 font-medium">장바구니</Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">로그인</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">장바구니가 비어있습니다</h2>
                <p className="text-gray-500 mb-8">원하는 상품을 장바구니에 담아보세요!</p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  쇼핑 계속하기
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        
                        {/* 가격 */}
                        <div className="flex items-center space-x-2 mt-2">
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span className="text-lg font-bold text-gray-900">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.discount && (
                            <span className="text-sm text-red-500 font-medium">
                              {item.discount}% 할인
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 수량 조절 */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      {/* 총 가격 */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {(item.price * item.quantity).toLocaleString()}원
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-700 mt-1"
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">주문 요약</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">{subtotal.toLocaleString()}원</span>
                </div>
                
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>할인 금액</span>
                    <span>-{totalDiscount.toLocaleString()}원</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">배송비</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}
                  </span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>총 결제금액</span>
                    <span>{total.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              {cartItems.length > 0 && (
                <>
                  <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 transition-colors mt-6">
                    주문하기
                  </button>
                  
                  <div className="mt-4 text-center">
                    <Link
                      href="/products"
                      className="text-indigo-600 hover:text-indigo-500 text-sm"
                    >
                      쇼핑 계속하기
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 