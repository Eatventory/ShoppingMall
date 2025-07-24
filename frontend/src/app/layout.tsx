import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { OrderProvider } from "../contexts/OrderContext";
import Navbar from '@/components/Navbar';
// import ClientScriptInit from "./ClientScriptInit";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JUNGLE SHOP",
  description: "네이비+민트 감성의 마켓플레이스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script 
          src="https://klicklab-sdk.pages.dev/klicklab_sdk.js" 
          data-sdk-key="7ea40a3f-e0eb-475b-a787-2fbbd7f9aa98"
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            // 🌍 Geo 정보 수집 및 이벤트 보강
            let geoData = null;
            
            // IP 기반 지오로케이션 수집
            fetch('https://ipapi.co/json/')
              .then(response => response.json())
              .then(data => {
                geoData = {
                  country: data.country_code,
                  city: data.city,
                  region: data.region,
                  timezone: data.timezone || 'Asia/Seoul',
                  ip: data.ip
                };
                console.log('🌍 Geo 정보 수집 완료:', geoData);
              })
              .catch(error => {
                console.log('⚠️ Geo 정보 수집 실패:', error);
              });

            // KlickLab 이벤트 가로채기 및 보강 (개선된 버전)
            const originalFetch = window.fetch;
            window.fetch = function(...args) {
              const [url, options] = args;
              
              // KlickLab 요청인지 확인
              if (url && url.includes('klicklab') && url.includes('collect')) {
                console.log('🎯 KlickLab 이벤트 감지:', url);
                
                // 요청 body 수정
                if (options && options.body && geoData) {
                  try {
                    const eventData = JSON.parse(options.body);
                    
                    // geo 정보 보강
                    if (eventData.context) {
                      eventData.context.geo = {
                        ...eventData.context.geo,
                        ...geoData
                      };
                    }
                    
                    // 수정된 body로 교체
                    const modifiedOptions = {
                      ...options,
                      body: JSON.stringify(eventData)
                    };
                    
                    console.log('📊 보강된 이벤트 데이터:', eventData);
                    
                    // 우리 백엔드로도 전송
                    fetch('http://15.164.169.130:5000/api/analytics/collect', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(eventData)
                    }).then(response => {
                      console.log('✅ 우리 백엔드로 전송 완료:', response.status);
                    }).catch(error => {
                      console.log('❌ 우리 백엔드 전송 실패:', error);
                    });
                    
                    // 수정된 옵션으로 원래 요청 진행
                    return originalFetch.call(this, url, modifiedOptions);
                  } catch (error) {
                    console.log('⚠️ 이벤트 데이터 파싱 실패:', error);
                  }
                }
              }
              
              // 원래 요청 계속 진행
              return originalFetch.apply(this, args);
            };
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <Navbar />
              {children}
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
