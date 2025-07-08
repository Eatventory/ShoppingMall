// 상품 관련 타입
export interface Product {
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

// 장바구니 아이템 타입
export interface CartItem extends Product {
  quantity: number;
}

// 찜한 상품 타입
export interface WishlistItem extends Product {
  addedAt: string;
}

// 주문 아이템 타입
export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// 주문 타입
export interface Order {
  id: string;
  orderDate: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

// 배송 정보 타입
export interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  zipCode: string;
  message: string;
}

// 결제 정보 타입
export interface PaymentInfo {
  method: 'card' | 'bank' | 'kakao' | 'naver';
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
}

// 서브 카테고리 타입
export interface SubCategory {
  id: string;
  name: string;
}

// 정렬 옵션 타입
export interface SortOption {
  id: string;
  name: string;
}

// 사용자 정보 타입
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
} 