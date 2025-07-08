import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrderContext';

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  message: string;
}

interface PaymentInfo {
  method: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
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
  if (cartItems.length === 0) {
    navigate('/');
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

      // 결제 성공 시 장바구니 비우고 팝업 표시
      clearCart();
      setShowPaymentSuccess(true);
    } catch (error) {
      console.error('결제 처리 중 오류:', error);
      alert('결제 처리 중 오류가 발생했습니다.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">주문/결제</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 배송 정보 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">배송 정보</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">받는 사람</label>
                <input
                  type="text"
                  value={shippingInfo.name}
                  onChange={(e) => handleShippingChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                <input
                  type="tel"
                  value={shippingInfo.phone}
                  onChange={(e) => handleShippingChange('phone', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => handleShippingChange('address', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                  placeholder="기본주소"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={shippingInfo.detailAddress}
                  onChange={(e) => handleShippingChange('detailAddress', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                  placeholder="상세주소"
                  required
                />
              </div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">결제 정보</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">결제 방법</label>
                <select
                  value={paymentInfo.method}
                  onChange={(e) => handlePaymentChange('method', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                >
                  <option value="card">신용카드</option>
                  <option value="bank">계좌이체</option>
                  <option value="kakao">카카오페이</option>
                  <option value="naver">네이버페이</option>
                </select>
              </div>
              
              {paymentInfo.method === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">카드번호</label>
                    <input
                      type="text"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                      placeholder="1234-5678-9012-3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">만료일</label>
                    <input
                      type="text"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={paymentInfo.cvv}
                      onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#14213d] focus:border-[#14213d]"
                      placeholder="123"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">주문 요약</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">수량: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString()}원</p>
                </div>
              ))}
              <hr />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>{shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString()}원`}</span>
                </div>
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>총 결제금액</span>
                  <span>{total.toLocaleString()}원</span>
                </div>
              </div>
            </div>
          </div>

          {/* 결제 버튼 */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#14213d] text-white py-3 px-4 rounded-lg hover:bg-[#1a2540] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? '결제 처리 중...' : '결제하기'}
          </button>
        </form>
      </div>

      {/* 결제 성공 팝업 */}
      {showPaymentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">결제가 완료되었습니다!</h3>
              <p className="text-sm text-gray-500 mb-4">주문이 성공적으로 처리되었습니다.</p>
              <button
                onClick={() => navigate('/checkout/success')}
                className="w-full bg-[#14213d] text-white py-2 px-4 rounded-md hover:bg-[#1a2540] transition"
              >
                주문 확인하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 