'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../contexts/CartContext';
import { useOrders } from '../../contexts/OrderContext';

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  message: string;
}

interface PaymentInfo {
  method: 'card' | 'bank' | 'kakao' | 'naver';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    message: ''
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);

  // 장바구니가 비어있으면 홈으로 리다이렉트
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/');
    }
  }, [cartItems.length, router]);

  if (cartItems.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const shippingFee = subtotal > 50000 ? 0 : 3000;
  const total = subtotal + shippingFee;

  const handleShippingChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card':
        return '신용카드';
      case 'bank':
        return '계좌이체';
      case 'kakao':
        return '카카오페이';
      case 'naver':
        return '네이버페이';
      default:
        return method;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 결제 처리 시뮬레이션 (실제로는 결제 API 호출)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 주문 데이터 생성
      const orderItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      const fullAddress = `${shippingInfo.address} ${shippingInfo.detailAddress}`.trim();

      // 주문 추가
      addOrder({
        status: 'completed',
        totalAmount: total,
        items: orderItems,
        shippingAddress: fullAddress,
        paymentMethod: getPaymentMethodText(paymentInfo.method)
      });

      // TODO: 결제 시작 이벤트 트래킹 구현
      console.log('결제 시작:', { cartItems, total, paymentMethod: paymentInfo.method });

      // 결제 성공 시 장바구니 비우고 팝업 표시
      clearCart();
      setShowPaymentSuccess(true);
      
      // 3초 후 성공 페이지로 이동
      setTimeout(() => {
        router.push('/checkout/success');
      }, 3000);
    } catch (error) {
      console.error('결제 처리 중 오류 발생:', error);
      alert('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* 주문 정보 */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">주문/결제</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 주문 상품 */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">주문 상품</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {item.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <span className="font-medium text-gray-900">
                            {item.price.toLocaleString()}원
                          </span>
                          {item.discount && (
                            <span className="text-sm text-red-500">
                              {item.discount}% 할인
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">수량: {item.quantity}</div>
                        <div className="font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">배송 정보</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      받는 분 *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.name}
                      onChange={(e) => handleShippingChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => handleShippingChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      우편번호 *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.zipCode}
                      onChange={(e) => handleShippingChange('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      기본주소 *
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => handleShippingChange('address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      상세주소
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.detailAddress}
                      onChange={(e) => handleShippingChange('detailAddress', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      배송 메모
                    </label>
                    <textarea
                      value={shippingInfo.message}
                      onChange={(e) => handleShippingChange('message', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-mint-400"
                      placeholder="배송 시 요청사항을 입력해주세요"
                    />
                  </div>
                </div>
              </div>

              {/* 결제 수단 */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">결제 수단</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentInfo.method === 'card'}
                      onChange={(e) => handlePaymentChange('method', e.target.value)}
                      className="text-mint-600 focus:ring-mint-500"
                    />
                    <label htmlFor="card" className="text-sm font-medium text-gray-700">
                      신용카드
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentInfo.method === 'bank'}
                      onChange={(e) => handlePaymentChange('method', e.target.value)}
                      className="text-mint-600 focus:ring-mint-500"
                    />
                    <label htmlFor="bank" className="text-sm font-medium text-gray-700">
                      계좌이체
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="kakao"
                      name="paymentMethod"
                      value="kakao"
                      checked={paymentInfo.method === 'kakao'}
                      onChange={(e) => handlePaymentChange('method', e.target.value)}
                      className="text-mint-600 focus:ring-mint-500"
                    />
                    <label htmlFor="kakao" className="text-sm font-medium text-gray-700">
                      카카오페이
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id="naver"
                      name="paymentMethod"
                      value="naver"
                      checked={paymentInfo.method === 'naver'}
                      onChange={(e) => handlePaymentChange('method', e.target.value)}
                      className="text-mint-600 focus:ring-mint-500"
                    />
                    <label htmlFor="naver" className="text-sm font-medium text-gray-700">
                      네이버페이
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">주문 요약</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">{subtotal.toLocaleString()}원</span>
                </div>
                
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

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isProcessing}
                className="w-full mt-6 bg-[#14213d] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#1a2540] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? '결제 처리 중...' : `${total.toLocaleString()}원 결제하기`}
              </button>

              <Link
                href="/cart"
                className="block w-full mt-3 text-center text-gray-600 hover:text-gray-900 py-2"
              >
                장바구니로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 결제 완료 팝업 */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">결제가 완료되었습니다!</h3>
              <p className="text-gray-600 mb-4">
                주문이 성공적으로 처리되었습니다.<br />
                주문 내역은 주문조회에서 확인하실 수 있습니다.
              </p>
              <div className="text-sm text-gray-500">
                잠시 후 주문 완료 페이지로 이동합니다...
              </div>
            </div>
            <button
              onClick={() => router.push('/checkout/success')}
              className="w-full bg-[#14213d] text-white py-2 px-4 rounded-md font-medium hover:bg-[#1a2540] transition-colors"
            >
              바로 이동하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 