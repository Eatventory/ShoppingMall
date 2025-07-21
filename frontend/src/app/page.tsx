'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const handleLike = (productId: number) => {
    // WishlistContext에서 자동으로 처리됨
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 슬라이드 배너 - 임시 주석처리 */}
      {/* <section className="bg-gradient-to-r from-[#14213d] via-[#1a2540] to-mint-400 py-0 h-72">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-8 h-full">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="rounded-2xl shadow-xl overflow-hidden h-64"
          >
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-[#14213d]">
                <div className="text-white md:w-1/2 p-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3">여름맞이 쿨특가<br />최대 50% 할인!</h2>
                  <p className="text-base mb-4">시원한 여름 상품을 민트 특가로 만나보세요.</p>
                  <Link href="/products" className="inline-block bg-white text-[#14213d] border-2 border-[#14213d] font-bold px-6 py-2 rounded-full shadow hover:bg-mint-400 hover:text-[#14213d] hover:border-mint-400 transition">특가 상품 보기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-6">
                  <img src="/sample1.jpg" alt="여름 특가" className="rounded-2xl w-64 h-64 object-cover border-4 border-mint-400" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-[#1a2540]">
                <div className="text-white md:w-1/2 p-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3">신규회원 웰컴쿠폰<br />최대 2만원 증정</h2>
                  <p className="text-base mb-4">지금 가입하면 민트 쿠폰팩 즉시 지급!</p>
                  <Link href="/register" className="inline-block bg-white text-[#1a2540] border-2 border-[#1a2540] font-bold px-6 py-2 rounded-full shadow hover:bg-mint-400 hover:text-[#1a2540] hover:border-mint-400 transition">회원가입하고 쿠폰받기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-6">
                  <img src="/sample2.jpg" alt="웰컴쿠폰" className="rounded-2xl w-64 h-64 object-cover border-4 border-mint-400" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-mint-400">
                <div className="text-white md:w-1/2 p-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-3">오늘만! 타임딜<br />한정수량 초특가</h2>
                  <p className="text-base mb-4">놓치면 후회할 타임세일 상품을 확인하세요.</p>
                  <Link href="/products" className="inline-block bg-white text-[#14213d] border-2 border-[#14213d] font-bold px-6 py-2 rounded-full shadow hover:bg-mint-400 hover:text-[#14213d] hover:border-mint-400 transition">타임딜 보기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-6">
                  <img src="/sample3.jpg" alt="타임딜" className="rounded-2xl w-64 h-64 object-cover border-4 border-[#14213d]" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section> */}

      {/* 이벤트/쿠폰/혜택 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">이벤트 · 쿠폰 · 혜택</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div 
            className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              console.log('이벤트 카드 클릭: 여름맞이 쿨특가 쿠폰');
              alert('여름맞이 쿨특가 쿠폰 이벤트 준비 중입니다!');
            }}
          >
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
              <img src="/event-coupon.jpg" alt="쿠폰 이벤트" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">여름맞이 쿨특가 쿠폰 (7/10~)</div>
            <div className="text-gray-500 text-sm text-center">여름 상품 10% 할인쿠폰을 지금 받으세요!</div>
          </div>
          <div 
            className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              console.log('이벤트 카드 클릭: 신규회원 웰컴 혜택');
              alert('신규회원 웰컴 혜택 이벤트 준비 중입니다!');
            }}
          >
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
            <img src="/welcome-coupon.jpg" alt="쿠폰 이벤트" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">신규회원 웰컴 혜택 (7/10~)</div>
            <div className="text-gray-500 text-sm text-center">회원가입 시 웰컴쿠폰 즉시 지급!</div>
          </div>
          <div 
            className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              console.log('이벤트 카드 클릭: 타임딜 한정 이벤트');
              alert('타임딜 한정 이벤트 준비 중입니다!');
            }}
          >
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
            <img src="/insta-promo.png" alt="쿠폰 이벤트" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">인스타그램 프로모션 (7/10~)</div>
            <div className="text-gray-500 text-sm text-center">인스타그램 전용 쿠폰을 확인하세요!</div>
          </div>
        </div>
      </section>

      {/* 오늘의 특가(타임딜) 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">오늘의 특가</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 1, name: '무선 블루투스 이어폰', price: 89000, originalPrice: 120000, image: '/sample1.jpg', discount: 26, freeShipping: true, coupon: true, liked: true, rating: 4.5, reviewCount: 128, description: '고음질 무선 이어폰, 노이즈 캔슬링 기능' },
            { id: 3, name: '면 티셔츠', price: 25000, originalPrice: 35000, image: '/sample3.jpg', discount: 29, freeShipping: false, coupon: true, liked: false, rating: 4.7, reviewCount: 156, description: '100% 면 소재의 편안한 티셔츠' },
            { id: 5, name: '커피머신', price: 250000, originalPrice: 320000, image: '/sample5.jpg', discount: 22, freeShipping: false, coupon: true, liked: false, rating: 4.8, reviewCount: 67, description: '자동 커피머신, 다양한 음료 제조 가능' },
            { id: 4, name: '운동화', price: 89000, image: '/sample4.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.3, reviewCount: 203, description: '편안한 착용감의 운동화' }
          ].map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onLike={handleLike}
            />
          ))}
        </div>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">베스트 상품</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 2, name: '스마트폰 케이스', price: 15000, image: '/sample2.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.2, reviewCount: 89, description: '충격 방지 실리콘 케이스' },
            { id: 6, name: '요가매트', price: 18000, image: '/sample6.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.1, reviewCount: 94, description: '미끄럼 방지 요가매트' },
            { id: 5, name: '커피머신', price: 250000, image: '/sample5.jpg', freeShipping: false, coupon: true, liked: false, rating: 4.8, reviewCount: 67, description: '자동 커피머신, 다양한 음료 제조 가능' },
            { id: 4, name: '운동화', price: 89000, image: '/sample4.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.3, reviewCount: 203, description: '편안한 착용감의 운동화' }
          ].map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              onLike={handleLike}
            />
          ))}
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#14213d] text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-mint-400 text-lg font-semibold mb-4">JUNGLE SHOP</h3>
              <p className="text-gray-300 text-sm">
                네이비+민트 감성의 마켓플레이스, 최고의 상품과 서비스를 제공합니다.
              </p>
            </div>
            <div>
              <h4 className="text-mint-400 text-sm font-semibold mb-4">고객 서비스</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-300 text-sm hover:text-mint-400">문의하기</Link></li>
                <li><Link href="/faq" className="text-gray-300 text-sm hover:text-mint-400">자주 묻는 질문</Link></li>
                <li><Link href="/shipping" className="text-gray-300 text-sm hover:text-mint-400">배송 안내</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-mint-400 text-sm font-semibold mb-4">회사 정보</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 text-sm hover:text-mint-400">회사 소개</Link></li>
                <li><Link href="/privacy" className="text-gray-300 text-sm hover:text-mint-400">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="text-gray-300 text-sm hover:text-mint-400">이용약관</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-mint-400 text-sm font-semibold mb-4">연락처</h4>
              <p className="text-gray-300 text-sm">
                이메일: info@jungleshop.com<br />
                전화: 02-1234-5678<br />
                주소: 서울시 강남구
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-300 text-sm text-center">
              © 2025 JUNGLE SHOP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tailwind에 mint 컬러 커스텀 필요: tailwind.config.js에 theme.extend.colors.mint 추가
