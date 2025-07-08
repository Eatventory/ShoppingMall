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
        if (window.KlickLab) {
          window.KlickLab.init({
            projectId: "jungleshop-prod",
            autoTrack: true,
          });
        }
      }}
    />
  );
}
