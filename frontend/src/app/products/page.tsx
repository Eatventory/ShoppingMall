'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ProductCard from '../../components/ProductCard';
import { useSearchParams } from 'next/navigation';

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

const MAIN_CATEGORIES = [
  { id: 'electronics', name: '전자제품' },
  { id: 'clothing', name: '의류' },
  { id: 'sports', name: '스포츠' },
  { id: 'appliances', name: '가전제품' },
  { id: 'food', name: '식품' },
  { id: 'beauty', name: '뷰티' },
];

const SUB_CATEGORIES: Record<string, { id: string; name: string }[]> = {
  electronics: [
    { id: 'laptop', name: '노트북' },
    { id: 'desktop', name: '데스크탑' },
    { id: 'appliance', name: '가전제품' },
    { id: 'mobile', name: '모바일' },
    { id: 'camera', name: '카메라' },
    { id: 'etc', name: '기타' },
  ],
  clothing: [
    { id: 'tshirt', name: '티셔츠' },
    { id: 'pants', name: '바지' },
    { id: 'outer', name: '아우터' },
    { id: 'shoes', name: '신발' },
    { id: 'cap', name: '모자' },
    { id: 'etc', name: '기타' },
  ],
  sports: [
    { id: 'yoga', name: '요가' },
    { id: 'fitness', name: '피트니스' },
    { id: 'ball', name: '구기종목' },
    { id: 'cycle', name: '자전거' },
    { id: 'swim', name: '수영' },
    { id: 'etc', name: '기타' },
  ],
  appliances: [
    { id: 'coffee', name: '커피머신' },
    { id: 'cleaner', name: '청소기' },
    { id: 'aircon', name: '에어컨' },
    { id: 'fridge', name: '냉장고' },
    { id: 'tv', name: 'TV' },
    { id: 'etc', name: '기타' },
  ],
  food: [
    { id: 'fruit', name: '과일' },
    { id: 'meat', name: '육류' },
    { id: 'snack', name: '간식' },
    { id: 'drink', name: '음료' },
    { id: 'seafood', name: '수산물' },
    { id: 'etc', name: '기타' },
  ],
  beauty: [
    { id: 'skincare', name: '스킨케어' },
    { id: 'makeup', name: '메이크업' },
    { id: 'hair', name: '헤어' },
    { id: 'body', name: '바디' },
    { id: 'perfume', name: '향수' },
    { id: 'etc', name: '기타' },
  ],
};

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryFromNav = searchParams.get('category') || 'all';
  const searchFromNav = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  // URL에서 검색어를 가져와서 상태에 설정
  useEffect(() => {
    if (searchFromNav) {
      setSearchTerm(searchFromNav);
    }
  }, [searchFromNav]);

  // 임시 상품 데이터 (나중에 API로 교체)
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "무선 블루투스 이어폰",
      description: "고음질 무선 이어폰, 노이즈 캔슬링 기능",
      price: 89000,
      originalPrice: 120000,
      image: "/sample1.jpg",
      category: "electronics",
      rating: 4.5,
      reviewCount: 128,
      discount: 26,
      freeShipping: true,
      coupon: true,
      liked: true,
      subCategory: 'mobile'
    },
    {
      id: 2,
      name: "스마트폰 케이스",
      description: "충격 방지 실리콘 케이스",
      price: 15000,
      image: "/sample2.jpg",
      category: "electronics",
      rating: 4.2,
      reviewCount: 89,
      freeShipping: true,
      coupon: false,
      liked: false,
      subCategory: 'mobile'
    },
    {
      id: 3,
      name: "면 티셔츠",
      description: "100% 면 소재의 편안한 티셔츠",
      price: 25000,
      originalPrice: 35000,
      image: "/sample3.jpg",
      category: "clothing",
      rating: 4.7,
      reviewCount: 156,
      discount: 29,
      freeShipping: false,
      coupon: true,
      liked: false,
      subCategory: 'tshirt'
    },
    {
      id: 4,
      name: "운동화",
      description: "편안한 착용감의 운동화",
      price: 89000,
      image: "/sample4.jpg",
      category: "clothing",
      rating: 4.3,
      reviewCount: 203,
      freeShipping: true,
      coupon: false,
      liked: false,
      subCategory: 'shoes'
    },
    {
      id: 5,
      name: "커피머신",
      description: "자동 커피머신, 다양한 음료 제조 가능",
      price: 250000,
      originalPrice: 320000,
      image: "/sample5.jpg",
      category: "appliances",
      rating: 4.8,
      reviewCount: 67,
      discount: 22,
      freeShipping: false,
      coupon: true,
      liked: false,
      subCategory: 'coffee'
    },
    {
      id: 6,
      name: "요가매트",
      description: "미끄럼 방지 요가매트",
      price: 18000,
      image: "/sample6.jpg",
      category: "sports",
      rating: 4.1,
      reviewCount: 94,
      freeShipping: true,
      coupon: false,
      liked: false,
      subCategory: 'yoga'
    }
  ];

  useEffect(() => {
    // API 호출 시뮬레이션
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesMain = categoryFromNav === 'all' || product.category === categoryFromNav;
    const matchesSub = !subCategory || (product.subCategory === subCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesMain && matchesSub && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'electronics', name: '전자제품' },
    { id: 'clothing', name: '의류' },
    { id: 'sports', name: '스포츠' },
    { id: 'appliances', name: '가전제품' }
  ];

  const sortOptions = [
    { id: 'popular', name: '인기순' },
    { id: 'rating', name: '평점순' },
    { id: 'price-low', name: '가격 낮은순' },
    { id: 'price-high', name: '가격 높은순' }
  ];

  // 찜하기 토글
  const toggleLike = (id: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">상품을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 결과 표시 */}
        {searchFromNav && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              "{searchFromNav}" 검색 결과
            </h2>
            <p className="text-gray-600">
              {sortedProducts.length}개의 상품을 찾았습니다
            </p>
          </div>
        )}

        {/* 2차 카테고리 (네비게이션에서 선택된 1차만) */}
        {categoryFromNav !== 'all' && SUB_CATEGORIES[categoryFromNav] && (
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setSubCategory('')}
              className={`px-3 py-1 rounded text-xs font-medium border ${subCategory === '' ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
            >
              전체
            </button>
            {SUB_CATEGORIES[categoryFromNav].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSubCategory(sub.id)}
                className={`px-3 py-1 rounded text-xs font-medium border ${subCategory === sub.id ? 'bg-indigo-500 text-white border-indigo-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
        {/* 상품 개수 */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            총 <span className="font-semibold">{sortedProducts.length}</span>개의 상품
          </p>
          {/* 정렬 */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onLike={toggleLike} />
          ))}
        </div>
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchFromNav ? `"${searchFromNav}"에 대한 검색 결과가 없습니다.` : '검색 결과가 없습니다.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
} 