import { Link } from 'react-router-dom';
import { useOrders } from '../contexts/OrderContext';

export default function CheckoutSuccessPage() {
  const { orders } = useOrders();
  
  // 가장 최근 주문을 사용
  const order = orders[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* 성공 아이콘 */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">주문이 완료되었습니다!</h1>
          <p className="text-lg text-gray-600 mb-8">
            주문해주셔서 감사합니다. 주문 내역은 아래와 같습니다.
          </p>

          {order && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="text-left">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">주문 정보</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문번호:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">주문일:</span>
                    <span className="font-medium">{order.orderDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제금액:</span>
                    <span className="font-medium text-lg">{order.totalAmount.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">결제방법:</span>
                    <span className="font-medium">{order.paymentMethod}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">주문 상품</h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-gray-600">{item.price.toLocaleString()}원 x {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">배송 정보</h3>
                  <p className="text-gray-600">{order.shippingAddress}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Link
              to="/orders"
              className="inline-block bg-[#14213d] text-white px-8 py-3 rounded-lg hover:bg-[#1a2540] transition font-semibold"
            >
              주문 내역 보기
            </Link>
            <div>
              <Link
                to="/"
                className="inline-block text-[#14213d] hover:text-[#1a2540] transition font-medium"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 