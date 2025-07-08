'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Link from 'next/link';
import { useCart } from '../../../contexts/CartContext';
import { useWishlist, WishlistItem } from '../../../contexts/WishlistContext';

// 임시 상품 데이터 (나중에 API로 교체)
const mockProducts = {
  1: {
    id: 1,
    name: '무선 블루투스 이어폰',
    price: 89000,
    originalPrice: 120000,
    image: '/sample1.jpg',
    discount: 26,
    freeShipping: true,
    coupon: true,
    liked: false,
    rating: 4.5,
    reviewCount: 128,
    description: '고음질 무선 이어폰, 노이즈 캔슬링 기능으로 완벽한 음악 감상을 경험하세요. 30시간 연속 재생과 빠른 충전 기능을 제공합니다.',
    category: '전자제품',
    stock: 15,
    images: ['/sample1.jpg', '/sample2.jpg', '/sample3.jpg', '/sample4.jpg']
  },
  2: {
    id: 2,
    name: '스마트폰 케이스',
    price: 15000,
    image: '/sample2.jpg',
    freeShipping: true,
    coupon: false,
    liked: true,
    rating: 4.2,
    reviewCount: 89,
    description: '충격 방지 실리콘 케이스로 스마트폰을 안전하게 보호합니다. 다양한 색상과 디자인을 제공합니다.',
    category: '전자제품',
    stock: 50,
    images: ['/sample2.jpg', '/sample1.jpg', '/sample3.jpg']
  },
  3: {
    id: 3,
    name: '면 티셔츠',
    price: 25000,
    originalPrice: 35000,
    image: '/sample3.jpg',
    discount: 29,
    freeShipping: false,
    coupon: true,
    liked: false,
    rating: 4.7,
    reviewCount: 156,
    description: '100% 면 소재의 편안한 티셔츠입니다. 다양한 사이즈와 컬러를 제공하며 일상복으로 최적입니다.',
    category: '의류',
    stock: 30,
    images: ['/sample3.jpg', '/sample4.jpg', '/sample1.jpg']
  },
  4: {
    id: 4,
    name: '운동화',
    price: 89000,
    image: '/sample4.jpg',
    freeShipping: true,
    coupon: false,
    liked: true,
    rating: 4.3,
    reviewCount: 203,
    description: '편안한 착용감의 운동화입니다. 가벼운 소재와 쿠션 기술로 장시간 착용해도 편안합니다. 다양한 운동과 일상생활에 적합합니다.',
    category: '스포츠',
    stock: 25,
    images: ['/sample4.jpg', '/sample5.jpg', '/sample6.jpg', '/sample1.jpg']
  },
  5: {
    id: 5,
    name: '커피머신',
    price: 250000,
    originalPrice: 320000,
    image: '/sample5.jpg',
    discount: 22,
    freeShipping: false,
    coupon: true,
    liked: false,
    rating: 4.8,
    reviewCount: 67,
    description: '자동 커피머신으로 다양한 음료를 제조할 수 있습니다. 에스프레소, 아메리카노, 라떼 등 원하는 음료를 간편하게 즐기세요. 19바 압력으로 완벽한 추출을 보장합니다.',
    category: '가전제품',
    stock: 8,
    images: ['/sample5.jpg', '/sample6.jpg', '/sample7.jpg', '/sample8.jpg']
  },
  6: {
    id: 6,
    name: '요가매트',
    price: 18000,
    image: '/sample6.jpg',
    freeShipping: true,
    coupon: false,
    liked: false,
    rating: 4.1,
    reviewCount: 94,
    description: '미끄럼 방지 요가매트입니다. 고급 TPE 소재로 제작되어 안전하고 편안한 요가 수업을 도와줍니다. 6mm 두께로 충분한 쿠션감을 제공합니다.',
    category: '스포츠',
    stock: 40,
    images: ['/sample6.jpg', '/sample7.jpg', '/sample8.jpg', '/sample9.jpg']
  }
};

export default function ProductDetail() {
  const params = useParams();
  const productId = Number(params.id);
  const product = mockProducts[productId as keyof typeof mockProducts];
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  // 상품이 없을 경우
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/products" className="text-mint-600 hover:underline">
            상품 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 상단 네비게이션 삭제됨 */}
      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 브레드크럼 */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-500 hover:text-mint-600">
                홈
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/products" className="text-gray-500 hover:text-mint-600">
                  전체상품
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 상품 상세 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 상품 이미지 */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 상품 정보 */}
          <div className="space-y-6">
            {/* 상품명 */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* 평점 */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviewCount}개 리뷰)
              </span>
            </div>

            {/* 가격 */}
            <div className="space-y-2">
              {'originalPrice' in product && product.originalPrice && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-500 line-through">
                    {product.originalPrice.toLocaleString()}원
                  </span>
                  {'discount' in product && product.discount && (
                    <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                      {product.discount}% 할인
                    </span>
                  )}
                </div>
              )}
              <div className="text-3xl font-bold text-gray-900">
                {product.price.toLocaleString()}원
              </div>
            </div>

            {/* 뱃지들 */}
            <div className="flex flex-wrap gap-2">
              {product.freeShipping && (
                <span className="bg-[#14213d] text-white text-sm font-bold px-3 py-1 rounded-full">
                  무료배송
                </span>
              )}
              {product.coupon && (
                <span className="bg-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  쿠폰 적용 가능
                </span>
              )}
            </div>

            {/* 재고 */}
            <div className="text-sm text-gray-600">
              재고: {product.stock}개
            </div>

            {/* 상품 설명 */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">상품 설명</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-4">
              {/* 찜하기 버튼 */}
              <button
                className="w-full flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                data-wishlist-button="true"
                data-product-id={product.id}
                onClick={() => {
                  if (isInWishlist(product.id)) {
                    removeFromWishlist(product.id);
                  } else {
                    const wishlistItem = {
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      image: product.image,
                      category: product.category,
                      rating: product.rating,
                      reviewCount: product.reviewCount,
                      freeShipping: product.freeShipping,
                      coupon: product.coupon,
                      ...(product.originalPrice !== undefined ? { originalPrice: product.originalPrice } : {}),
                      ...(product.discount !== undefined ? { discount: product.discount } : {})
                    } as WishlistItem;
                    addToWishlist(wishlistItem);
                  }
                }}
              >
                {isInWishlist(product.id) ? (
                  <AiFillHeart className="text-red-500 w-5 h-5" />
                ) : (
                  <AiOutlineHeart className="text-gray-400 w-5 h-5" />
                )}
                <span>{isInWishlist(product.id) ? '찜 완료' : '찜하기'}</span>
              </button>

              {/* 장바구니 담기 버튼 */}
              <button
                className="w-full flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  // 실제 장바구니에 추가
                  const cartItem: any = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  };
                  
                  // 선택적 속성들 추가
                  if ('originalPrice' in product) {
                    cartItem.originalPrice = product.originalPrice;
                  }
                  if ('discount' in product) {
                    cartItem.discount = product.discount;
                  }
                  
                  addToCart(cartItem);
                  
                  // 성공 팝업 표시
                  setShowCartSuccess(true);
                }}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                <span>장바구니 담기</span>
              </button>


            </div>
          </div>
        </div>
      </div>

      {/* 장바구니 추가 성공 팝업 */}
      {showCartSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
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
                onClick={() => setShowCartSuccess(false)}
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