import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BsCartPlus } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
    discount?: number;
    freeShipping?: boolean;
    coupon?: boolean;
    liked?: boolean;
  };
  onLike?: (id: number) => void;
}

export default function ProductCard({ product, onLike }: ProductCardProps) {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  const handleProductClick = (e: React.MouseEvent) => {
    // 찜하기 버튼이나 장바구니 버튼 클릭 시에는 상품 상세로 이동하지 않음
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    
    // 상품 상세 페이지로 이동
    router.push(`/products/${product.id}`);
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
            <span className="bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md border border-emerald-800">쿠폰</span>
          )}
        </div>
        {/* 찜하기 하트 */}
        <div 
          className="absolute top-2 right-2 z-10 p-1 bg-white/80 rounded-full shadow-md border border-mint-200 hover:scale-110 transition cursor-pointer"
          data-wishlist-button="true"
          data-product-id={product.id}
          data-product-name={product.name}
          data-clickstream-ignore="true"
          onClick={(e) => {
            e.stopPropagation();
            
            // 클릭스트림 수동 추적
            if (window.KlickLab && window.KlickLab.sendEvent) {
              window.KlickLab.sendEvent('wishlist_toggle', {
                product_id: product.id,
                product_name: product.name,
                action: isInWishlist(product.id) ? 'remove' : 'add',
                timestamp: Date.now()
              });
            }
            
            if (isInWishlist(product.id)) {
              removeFromWishlist(product.id);
            } else {
              addToWishlist({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                category: product.category,
                rating: product.rating,
                reviewCount: product.reviewCount,
                discount: product.discount,
                freeShipping: product.freeShipping,
                coupon: product.coupon
              });
            }
            if (onLike) onLike(product.id);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.currentTarget.click();
            }
          }}
          aria-label="찜하기"
        >
          {isInWishlist(product.id) ? (
            <div className="text-red-400 w-8 h-8 drop-shadow flex items-center justify-center text-2xl font-bold">♥</div>
          ) : (
            <div className="text-gray-300 w-8 h-8 drop-shadow hover:text-red-400 transition flex items-center justify-center text-2xl font-bold">♡</div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        )}
        {/* 평점 */}
        {product.rating !== undefined && product.reviewCount !== undefined && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        )}
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
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">장바구니에 추가되었습니다!</h3>
              <p className="text-sm text-gray-600">
                {product.name}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCartSuccess(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                계속 쇼핑
              </button>
              <Link
                href="/cart"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCartSuccess(false);
                }}
                className="flex-1 bg-[#14213d] text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-[#1a2540] transition-colors"
              >
                장바구니 보기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 