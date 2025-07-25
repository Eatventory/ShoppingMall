import { Product } from '../types';

// Mock 상품 데이터
export const mockProducts: Product[] = [
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

// Mock 주문 데이터
export const mockOrders = [
  {
    id: 'ORD-20241201-001',
    orderDate: '2024-12-01',
    status: 'completed' as const,
    totalAmount: 104000,
    items: [
      {
        id: 1,
        name: '무선 블루투스 이어폰',
        price: 89000,
        quantity: 1,
        image: '/sample1.jpg'
      },
      {
        id: 2,
        name: '스마트폰 케이스',
        price: 15000,
        quantity: 1,
        image: '/sample2.jpg'
      }
    ],
    shippingAddress: '서울시 강남구 테헤란로 123',
    paymentMethod: '신용카드'
  }
]; 