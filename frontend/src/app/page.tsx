import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">쇼핑몰</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/products" className="text-gray-500 hover:text-gray-900">
                상품
              </Link>
              <Link href="/cart" className="text-gray-500 hover:text-gray-900">
                장바구니
              </Link>
              <Link href="/login" className="text-gray-500 hover:text-gray-900">
                로그인
              </Link>
              <Link href="/register" className="text-gray-500 hover:text-gray-900">
                회원가입
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                환영합니다
              </h2>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                최고의 상품들을 만나보세요. 다양한 카테고리의 상품들을 확인하고 구매해보세요.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/products"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    상품 보기
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <Link
                    href="/register"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    회원가입
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 카테고리 섹션 */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900">
                인기 카테고리
              </h3>
              <p className="mt-4 text-lg text-gray-500">
                다양한 카테고리의 상품들을 확인해보세요
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: '전자제품', description: '최신 전자제품', href: '/products?category=electronics' },
                { name: '의류', description: '패션 의류', href: '/products?category=clothing' },
                { name: '가전제품', description: '생활 가전', href: '/products?category=appliances' },
                { name: '스포츠', description: '스포츠 용품', href: '/products?category=sports' },
              ].map((category) => (
                <div key={category.name} className="bg-white rounded-lg shadow-sm p-6">
                  <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                  <p className="mt-2 text-sm text-gray-500">{category.description}</p>
                  <Link
                    href={category.href}
                    className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    보기
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 특징 섹션 */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-extrabold text-gray-900">
                왜 우리 쇼핑몰을 선택해야 할까요?
              </h3>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: '빠른 배송',
                  description: '주문 후 1-2일 내에 배송됩니다.',
                  icon: '🚚',
                },
                {
                  title: '안전한 결제',
                  description: '다양한 안전한 결제 방법을 제공합니다.',
                  icon: '💳',
                },
                {
                  title: '고객 지원',
                  description: '24/7 고객 지원 서비스를 제공합니다.',
                  icon: '🎧',
                },
              ].map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h4 className="text-lg font-medium text-gray-900">{feature.title}</h4>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">쇼핑몰</h3>
              <p className="text-gray-300 text-sm">
                최고의 상품과 서비스를 제공하는 온라인 쇼핑몰입니다.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">고객 서비스</h4>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-300 text-sm hover:text-white">문의하기</Link></li>
                <li><Link href="/faq" className="text-gray-300 text-sm hover:text-white">자주 묻는 질문</Link></li>
                <li><Link href="/shipping" className="text-gray-300 text-sm hover:text-white">배송 안내</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">회사 정보</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-300 text-sm hover:text-white">회사 소개</Link></li>
                <li><Link href="/privacy" className="text-gray-300 text-sm hover:text-white">개인정보처리방침</Link></li>
                <li><Link href="/terms" className="text-gray-300 text-sm hover:text-white">이용약관</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">연락처</h4>
              <p className="text-gray-300 text-sm">
                이메일: info@shoppingmall.com<br />
                전화: 02-1234-5678<br />
                주소: 서울시 강남구
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-gray-300 text-sm text-center">
              © 2024 쇼핑몰. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
