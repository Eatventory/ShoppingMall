import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">장바구니가 비어있습니다</h1>
          <p className="text-gray-600 mb-8">상품을 담아보세요!</p>
          <Link to="/products" className="bg-[#14213d] text-white px-6 py-3 rounded-lg hover:bg-[#1a2540] transition">
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 상품 목록 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1 ml-4">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600">{item.price.toLocaleString()}원</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="border border-gray-300 rounded px-2 py-1"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 주문 요약 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">주문 요약</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>상품 금액</span>
                  <span>{getCartTotal().toLocaleString()}원</span>
                </div>
                <div className="flex justify-between">
                  <span>배송비</span>
                  <span>{getCartTotal() > 50000 ? '무료' : '3,000원'}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>총 결제금액</span>
                  <span>{(getCartTotal() + (getCartTotal() > 50000 ? 0 : 3000)).toLocaleString()}원</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full bg-[#14213d] text-white py-3 px-4 rounded-lg hover:bg-[#1a2540] transition text-center block"
              >
                주문하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 