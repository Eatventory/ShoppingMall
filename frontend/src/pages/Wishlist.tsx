import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💖</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">찜한 상품이 없습니다</h1>
          <p className="text-gray-600 mb-8">마음에 드는 상품을 찜해보세요!</p>
          <Link to="/products" className="bg-[#14213d] text-white px-6 py-3 rounded-lg hover:bg-[#1a2540] transition">
            쇼핑하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">찜한 상품</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.price.toLocaleString()}원</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-[#14213d] text-white py-2 px-4 rounded hover:bg-[#1a2540] transition"
                  >
                    장바구니
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 