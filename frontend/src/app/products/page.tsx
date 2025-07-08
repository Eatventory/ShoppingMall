'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ProductCard from '../../components/ProductCard';

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
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

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
      liked: true
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
      liked: false
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
      liked: false
    },
    {
      id: 4,
      name: "운동화",
      description: "편안한 착용감의 운동화",
      price: 89000,
      image: "/sample4.jpg",
      category: "sports",
      rating: 4.3,
      reviewCount: 203,
      freeShipping: true,
      coupon: false,
      liked: true
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
      liked: false
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
      liked: false
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
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">쇼핑몰</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-indigo-600 font-medium">상품</Link>
              <Link href="/cart" className="text-gray-500 hover:text-gray-900">장바구니</Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">로그인</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 검색 및 필터 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* 검색 */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="상품명을 검색하세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

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
        </div>

        {/* 상품 개수 */}
        <div className="mb-6">
          <p className="text-gray-600">
            총 <span className="font-semibold">{sortedProducts.length}</span>개의 상품
          </p>
        </div>

        {/* 상품 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} onLike={toggleLike} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
} 