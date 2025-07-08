'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* 메인 슬라이드 배너 */}
      <section className="bg-gradient-to-r from-[#14213d] via-[#1a2540] to-mint-400 py-0">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-12">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="rounded-2xl shadow-xl overflow-hidden"
          >
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-[#14213d]">
                <div className="text-white md:w-1/2 p-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">여름맞이 쿨특가<br />최대 50% 할인!</h2>
                  <p className="text-lg mb-6">시원한 여름 상품을 민트 특가로 만나보세요.</p>
                  <Link href="/products" className="inline-block bg-white text-[#14213d] border-2 border-[#14213d] font-bold px-8 py-3 rounded-full shadow hover:bg-mint-400 hover:text-[#14213d] hover:border-mint-400 transition">특가 상품 보기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-8">
                  <img src="/sample1.jpg" alt="여름 특가" className="rounded-2xl w-80 h-80 object-cover border-4 border-mint-400" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-[#1a2540]">
                <div className="text-white md:w-1/2 p-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">신규회원 웰컴쿠폰<br />최대 2만원 증정</h2>
                  <p className="text-lg mb-6">지금 가입하면 민트 쿠폰팩 즉시 지급!</p>
                  <Link href="/register" className="inline-block bg-white text-[#1a2540] border-2 border-[#1a2540] font-bold px-8 py-3 rounded-full shadow hover:bg-mint-400 hover:text-[#1a2540] hover:border-mint-400 transition">회원가입하고 쿠폰받기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-8">
                  <img src="/sample2.jpg" alt="웰컴쿠폰" className="rounded-2xl w-80 h-80 object-cover border-4 border-mint-400" />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col md:flex-row items-center bg-mint-400">
                <div className="text-white md:w-1/2 p-8">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">오늘만! 타임딜<br />한정수량 초특가</h2>
                  <p className="text-lg mb-6">놓치면 후회할 타임세일 상품을 확인하세요.</p>
                  <Link href="/products" className="inline-block bg-white text-[#14213d] border-2 border-[#14213d] font-bold px-8 py-3 rounded-full shadow hover:bg-mint-400 hover:text-[#14213d] hover:border-mint-400 transition">타임딜 보기</Link>
                </div>
                <div className="md:w-1/2 flex justify-center p-8">
                  <img src="/sample3.jpg" alt="타임딜" className="rounded-2xl w-80 h-80 object-cover border-4 border-[#14213d]" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* 오늘의 특가(타임딜) 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">오늘의 특가</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 1, name: '무선 블루투스 이어폰', price: 89000, originalPrice: 120000, image: '/sample1.jpg', discount: 26, freeShipping: true, coupon: true, liked: true, rating: 4.5, reviewCount: 128, description: '고음질 무선 이어폰, 노이즈 캔슬링 기능' },
            { id: 3, name: '면 티셔츠', price: 25000, originalPrice: 35000, image: '/sample3.jpg', discount: 29, freeShipping: false, coupon: true, liked: false, rating: 4.7, reviewCount: 156, description: '100% 면 소재의 편안한 티셔츠' },
            { id: 5, name: '커피머신', price: 250000, originalPrice: 320000, image: '/sample5.jpg', discount: 22, freeShipping: false, coupon: true, liked: false, rating: 4.8, reviewCount: 67, description: '자동 커피머신, 다양한 음료 제조 가능' },
            { id: 4, name: '운동화', price: 89000, image: '/sample4.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.3, reviewCount: 203, description: '편안한 착용감의 운동화' }
          ].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">베스트 상품</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 2, name: '스마트폰 케이스', price: 15000, image: '/sample2.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.2, reviewCount: 89, description: '충격 방지 실리콘 케이스' },
            { id: 6, name: '요가매트', price: 18000, image: '/sample6.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.1, reviewCount: 94, description: '미끄럼 방지 요가매트' },
            { id: 5, name: '커피머신', price: 250000, image: '/sample5.jpg', freeShipping: false, coupon: true, liked: false, rating: 4.8, reviewCount: 67, description: '자동 커피머신, 다양한 음료 제조 가능' },
            { id: 4, name: '운동화', price: 89000, image: '/sample4.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.3, reviewCount: 203, description: '편안한 착용감의 운동화' }
          ].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 카테고리별 추천 섹션 */}
      <section className="bg-[#f8fafc] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-[#14213d] mb-6">카테고리별 추천</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 디지털/가전 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">💻</span>
                <span className="font-bold text-[#14213d]">디지털/가전</span>
                <a href="/products?category=electronics" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 201, name: '노트북', price: 1200000, image: '/sample1.jpg', freeShipping: true, coupon: true, liked: false, rating: 4.8, reviewCount: 210, description: '최신형 고성능 노트북' }} />
                <ProductCard product={{ id: 202, name: '무선 이어폰', price: 89000, image: '/sample2.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.6, reviewCount: 98, description: '고음질 무선 이어폰' }} />
              </div>
            </div>
            {/* 패션의류 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">👗</span>
                <span className="font-bold text-[#14213d]">패션의류</span>
                <a href="/products?category=fashion" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 203, name: '여름 반팔티', price: 19000, image: '/sample3.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.7, reviewCount: 156, description: '시원한 소재의 여름 반팔티' }} />
                <ProductCard product={{ id: 204, name: '린넨 팬츠', price: 29000, image: '/sample4.jpg', freeShipping: false, coupon: true, liked: false, rating: 4.5, reviewCount: 77, description: '통기성 좋은 린넨 팬츠' }} />
              </div>
            </div>
            {/* 식품 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🍎</span>
                <span className="font-bold text-[#14213d]">식품</span>
                <a href="/products?category=food" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 205, name: '유기농 사과', price: 12000, image: '/sample5.jpg', freeShipping: false, coupon: true, liked: false, rating: 4.9, reviewCount: 54, description: '신선한 유기농 사과 3kg' }} />
                <ProductCard product={{ id: 206, name: '한우 불고기', price: 39000, image: '/sample6.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.8, reviewCount: 65, description: '국내산 한우 불고기 500g' }} />
              </div>
            </div>
            {/* 뷰티 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">💄</span>
                <span className="font-bold text-[#14213d]">뷰티</span>
                <a href="/products?category=beauty" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 207, name: '쿠션 파운데이션', price: 32000, image: '/sample7.jpg', freeShipping: true, coupon: true, liked: false, rating: 4.7, reviewCount: 77, description: '촉촉한 쿠션 파운데이션' }} />
                <ProductCard product={{ id: 208, name: '립스틱', price: 18000, image: '/sample8.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.5, reviewCount: 120, description: '선명한 컬러 립스틱' }} />
              </div>
            </div>
            {/* 스포츠/레저 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">⚽</span>
                <span className="font-bold text-[#14213d]">스포츠/레저</span>
                <a href="/products?category=sports" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 209, name: '요가매트', price: 18000, image: '/sample9.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.5, reviewCount: 120, description: '미끄럼 방지 요가매트' }} />
                <ProductCard product={{ id: 210, name: '러닝화', price: 69000, image: '/sample10.jpg', freeShipping: true, coupon: true, liked: true, rating: 4.8, reviewCount: 88, description: '가벼운 러닝화' }} />
              </div>
            </div>
            {/* 유아동 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🧸</span>
                <span className="font-bold text-[#14213d]">유아동</span>
                <a href="/products?category=kids" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 211, name: '아기 물티슈', price: 8900, image: '/sample11.jpg', freeShipping: true, coupon: false, liked: true, rating: 4.8, reviewCount: 65, description: '안심하고 쓸 수 있는 아기 물티슈' }} />
                <ProductCard product={{ id: 212, name: '유아용 의자', price: 39000, image: '/sample12.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.6, reviewCount: 41, description: '편안한 유아용 의자' }} />
              </div>
            </div>
            {/* 리빙/홈 */}
            <div className="bg-white rounded-xl shadow p-6 border border-mint-100 flex flex-col">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🛋️</span>
                <span className="font-bold text-[#14213d]">리빙/홈</span>
                <a href="/products?category=home" className="ml-auto text-mint-600 text-sm hover:underline">더보기 &gt;</a>
              </div>
              <div className="flex gap-4">
                <ProductCard product={{ id: 213, name: '프리미엄 소파', price: 650000, image: '/sample13.jpg', freeShipping: true, coupon: true, liked: false, rating: 4.9, reviewCount: 33, description: '고급스러운 프리미엄 소파' }} />
                <ProductCard product={{ id: 214, name: '디퓨저', price: 22000, image: '/sample14.jpg', freeShipping: true, coupon: false, liked: false, rating: 4.7, reviewCount: 19, description: '은은한 향의 디퓨저' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 이벤트/쿠폰/혜택 섹션 */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-[#14213d] mb-6">이벤트 · 쿠폰 · 혜택</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100">
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
              <img src="/event-coupon.jpg" alt="쿠폰 이벤트" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">여름맞이 쿨특가 쿠폰</div>
            <div className="text-gray-500 text-sm text-center">여름 상품 10% 할인쿠폰을 지금 받으세요!</div>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100">
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
              <img src="/event-benefit.jpg" alt="신규회원 혜택" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">신규회원 웰컴 혜택</div>
            <div className="text-gray-500 text-sm text-center">회원가입 시 웰컴쿠폰 즉시 지급!</div>
          </div>
          <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 border border-mint-100">
            <div className="w-full aspect-[3/2] mb-4 overflow-hidden rounded-lg">
              <img src="/event-timedeal.jpg" alt="타임딜" className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-semibold text-emerald-700 mb-2">타임딜 한정 이벤트</div>
            <div className="text-gray-500 text-sm text-center">타임딜 상품 전용 5% 쿠폰을 확인하세요!</div>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-[#14213d] text-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-mint-400 text-lg font-semibold mb-4">NAMAN MARKET</h3>
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
                이메일: info@namanmarket.com<br />
                전화: 02-1234-5678<br />
                주소: 서울시 강남구
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-300 text-sm text-center">
              © 2024 NAMAN MARKET. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Tailwind에 mint 컬러 커스텀 필요: tailwind.config.js에 theme.extend.colors.mint 추가
