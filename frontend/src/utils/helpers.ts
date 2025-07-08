import { ORDER_STATUS, ORDER_STATUS_COLORS, PAYMENT_METHODS } from './constants';

// 주문 상태 텍스트 반환
export const getStatusText = (status: string): string => {
  return ORDER_STATUS[status as keyof typeof ORDER_STATUS] || status;
};

// 주문 상태 색상 반환
export const getStatusColor = (status: string): string => {
  return ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS] || 'bg-gray-100 text-gray-800';
};

// 결제 수단 텍스트 반환
export const getPaymentMethodText = (method: string): string => {
  return PAYMENT_METHODS[method as keyof typeof PAYMENT_METHODS] || method;
};

// 가격 포맷팅
export const formatPrice = (price: number): string => {
  return price.toLocaleString() + '원';
};

// 할인율 계산
export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// 배송비 계산
export const calculateShippingFee = (subtotal: number, threshold: number = 50000, fee: number = 3000): number => {
  return subtotal >= threshold ? 0 : fee;
};

// 총 금액 계산
export const calculateTotal = (subtotal: number, shippingFee: number): number => {
  return subtotal + shippingFee;
};

// 날짜 포맷팅
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// 검색어 하이라이트
export const highlightSearchTerm = (text: string, searchTerm: string): string => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  CART: 'jungle_shop_cart',
  WISHLIST: 'jungle_shop_wishlist',
  ORDERS: 'jungle_shop_orders'
} as const; 