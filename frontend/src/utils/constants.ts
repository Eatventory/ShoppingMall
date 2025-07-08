import { Category, SubCategory, SortOption } from '../types';

// 메인 카테고리
export const MAIN_CATEGORIES: Category[] = [
  { id: 'electronics', name: '전자제품' },
  { id: 'clothing', name: '의류' },
  { id: 'sports', name: '스포츠' },
  { id: 'appliances', name: '가전제품' },
  { id: 'food', name: '식품' },
  { id: 'beauty', name: '뷰티' },
];

// 서브 카테고리
export const SUB_CATEGORIES: Record<string, SubCategory[]> = {
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

// 정렬 옵션
export const SORT_OPTIONS: SortOption[] = [
  { id: 'popular', name: '인기순' },
  { id: 'rating', name: '평점순' },
  { id: 'price-low', name: '가격 낮은순' },
  { id: 'price-high', name: '가격 높은순' }
];

// 결제 수단
export const PAYMENT_METHODS = {
  card: '신용카드',
  bank: '계좌이체',
  kakao: '카카오페이',
  naver: '네이버페이'
} as const;

// 주문 상태
export const ORDER_STATUS = {
  completed: '결제완료',
  processing: '처리중',
  shipped: '배송중',
  delivered: '배송완료'
} as const;

// 주문 상태 색상
export const ORDER_STATUS_COLORS = {
  completed: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-gray-100 text-gray-800'
} as const;

// 배송비 기준
export const SHIPPING_THRESHOLD = 50000; // 5만원 이상 무료배송
export const SHIPPING_FEE = 3000; // 기본 배송비 