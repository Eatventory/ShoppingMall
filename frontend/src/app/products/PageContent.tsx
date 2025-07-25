'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import EmptyState from '../../components/ui/EmptyState';
import { Product } from '../../types';
import { SUB_CATEGORIES, SORT_OPTIONS } from '../../utils/constants';
import { mockProducts } from '../../utils/mockData';

export default function PageContent() {
  const searchParams = useSearchParams();
  const categoryFromNav = searchParams.get('category') || 'all';
  const searchFromNav = searchParams.get('search') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (searchFromNav) {
      setSearchTerm(searchFromNav);
    }
  }, [searchFromNav]);

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesMain = categoryFromNav === 'all' || product.category === categoryFromNav;
    const matchesSub = !subCategory || (product.subCategory === subCategory);
    const matchesSearch =
      !searchTerm ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const toggleLike = (id: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  if (loading) {
    return (
      <LoadingSpinner size="lg" text="상품을 불러오는 중..." className="min-h-screen" />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {categoryFromNav !== 'all' && SUB_CATEGORIES[categoryFromNav] && (
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setSubCategory('')}
              className={`px-3 py-1 rounded text-xs font-medium border ${
                subCategory === ''
                  ? 'bg-indigo-500 text-white border-indigo-700'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              전체
            </button>
            {SUB_CATEGORIES[categoryFromNav].map(sub => (
              <button
                key={sub.id}
                onClick={() => setSubCategory(sub.id)}
                className={`px-3 py-1 rounded text-xs font-medium border ${
                  subCategory === sub.id
                    ? 'bg-indigo-500 text-white border-indigo-700'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            총 <span className="font-semibold">{sortedProducts.length}</span>개의 상품
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">정렬:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} onLike={toggleLike} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <EmptyState
            icon="🔍"
            title="검색 결과가 없습니다"
            description={
              searchFromNav
                ? `"${searchFromNav}"에 대한 검색 결과가 없습니다.`
                : '검색 결과가 없습니다.'
            }
            actionText="전체 상품 보기"
            actionHref="/products"
          />
        )}
      </main>
    </div>
  );
}
