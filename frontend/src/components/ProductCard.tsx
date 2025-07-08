import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  freeShipping?: boolean;
  coupon?: boolean;
  liked?: boolean;
  subCategory?: string;
}

interface ProductCardProps {
  product: Product;
  onLike?: (id: number) => void;
}

export default function ProductCard({ product, onLike }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  const handleProductClick = (e: React.MouseEvent) => {
    // 찜하기 버튼이나 장바구니 버튼 클릭 시에는 상품 상세로 이동하지 않음
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    // 상품 상세 페이지로 이동
    navigate(`/products/${product.id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-mint-100 relative cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {/* 뱃지 영역 */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 z-10">
          {product.discount && (
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md border border-red-800 mb-1">{product.discount}% 할인</span>
          )}
          {product.freeShipping && (
            <span className="bg-[#14213d] text-white text-xs font-bold px-2 py-1 rounded shadow-md border border-mint-400 mb-1">무료배송</span>
          )}
          {product.coupon && (
            <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md border border-yellow-600">쿠폰</span>
          )}
        </div>
        
        {/* 찜하기 버튼 */}
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
          onClick={(e) => {
            e.stopPropagation();
            if (isInWishlist(product.id)) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
              });
            }
            if (onLike) {
              onLike(product.id);
            }
          }}
          aria-label="찜하기"
        >
          {isInWishlist(product.id) ? (
            <AiFillHeart className="w-5 h-5 text-red-500" />
          ) : (
            <AiOutlineHeart className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <div className="p-4">
        {/* 상품명 */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        
        {/* 평점 */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">({product.reviewCount})</span>
        </div>
        
        {/* 가격 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}원
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()}원
            </span>
          </div>
          <button 
            className="px-4 py-2 bg-white border border-gray-300 text-mint-400 rounded-md hover:bg-mint-400 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                discount: product.discount
              });
              setShowCartSuccess(true);
            }}
            aria-label="장바구니에 추가"
          >
            <BsCartPlus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 장바구니 추가 성공 팝업 */}
      {showCartSuccess && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-4 mx-2">
            <div className="text-center">
              <div className="text-green-500 text-2xl mb-2">✓</div>
              <p className="text-sm text-gray-700">장바구니에 추가되었습니다</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCartSuccess(false);
                }}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 