// app/ClientScriptInit.tsx
"use client";

import Script from "next/script";

declare global {
    interface Window {
      KlickLab?: {
        init: (options?: any) => void;
        sendEvent?: (...args: any[]) => void;
      };
    }
  }
  
export default function ClientScriptInit() {
  return (
    <Script
      src="https://klicklab-sdk.pages.dev/klicklab_sdk.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log("✅ KlickLab SDK loaded");
        
        // 지연 초기화로 DOM이 완전히 로드된 후 실행
        setTimeout(() => {
          if (window.KlickLab) {
            // SDK 초기화 전에 모든 메서드를 오버라이드
            const originalSDK = { ...window.KlickLab };
            
            // getElementPath를 먼저 안전하게 오버라이드
            window.KlickLab.getElementPath = () => '';
            
            // 최소한의 설정으로 초기화
            window.KlickLab.init({
              projectId: "jungleshop-prod",
              autoTrack: false,
              enableClickTracking: false,
              disableAutoTracking: true,
              manualTrackingOnly: true,
            });
            
            // 모든 추적 관련 메서드를 빈 함수로 교체
            const noop = () => {};
            const safeSendEvent = (eventName: string, data: any) => {
              // 원본 sendEvent만 사용
              if (originalSDK.sendEvent) {
                originalSDK.sendEvent(eventName, data);
              }
            };
            
            // SDK 메서드들을 안전하게 교체
            window.KlickLab.trackClick = noop;
            window.KlickLab.autoTrackClick = noop;
            window.KlickLab.trackEvent = noop;
            window.KlickLab.getElementPath = () => '';
            window.KlickLab.sendEvent = safeSendEvent;
            
            // DOM 이벤트 리스너 차단
            const originalAddEventListener = document.addEventListener;
            document.addEventListener = function(type, listener, options) {
              if (type === 'click' && 
                  (listener.toString().includes('KlickLab') || 
                   listener.toString().includes('trackClick') ||
                   listener.toString().includes('autoTrack'))) {
                return; // KlickLab 관련 리스너 차단
              }
              return originalAddEventListener.call(this, type, listener, options);
            };
            
            console.log("🚫 KlickLab auto-tracking disabled, manual tracking only");
          }
        }, 1000);
      }}
    />
  );
}
