'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderDate: string;
  status: 'completed' | 'processing' | 'shipped' | 'delivered';
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => void;
  getOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // 로컬 스토리지에서 주문 데이터 로드 (hydration 문제 해결)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('jungle_shop_orders');
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch (error) {
          console.error('주문 데이터 로드 실패:', error);
        }
      }
    }
  }, []);

  // 주문 데이터를 로컬 스토리지에 저장 (hydration 문제 해결)
  const saveOrders = (newOrders: Order[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jungle_shop_orders', JSON.stringify(newOrders));
    }
  };

  // 새 주문 추가
  const addOrder = (orderData: Omit<Order, 'id' | 'orderDate'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toISOString().slice(0, 10)
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  // 주문 목록 조회
  const getOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
} 