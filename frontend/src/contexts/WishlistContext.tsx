'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';



export interface WishlistItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  discount?: number;
  freeShipping?: boolean;
  coupon?: boolean;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // 클릭스트림 SDK 자동 추적 비활성화
  useEffect(() => {
    if (typeof window !== 'undefined' && window.KlickLab) {
      // 타입 단언을 사용해서 메서드 오버라이드
      const klickLab = window.KlickLab as any;
      
      // getElementPath를 안전하게 오버라이드
      klickLab.getElementPath = () => '';
      
      // 자동 추적 메서드들을 빈 함수로 교체
      const noop = () => {};
      klickLab.trackClick = noop;
      klickLab.autoTrackClick = noop;
      klickLab.trackEvent = noop;
      
      console.log("🚫 KlickLab auto-tracking disabled in WishlistContext");
    }
  }, []);

  // 로컬 스토리지에서 찜한 상품 불러오기
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
      }
    }
  }, []);

  // 찜한 상품이 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      // 이미 찜한 상품인지 확인
      if (prev.some(wishlistItem => wishlistItem.id === item.id)) {
        return prev; // 이미 있으면 추가하지 않음
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 