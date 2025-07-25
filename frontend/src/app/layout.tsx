
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { OrderProvider } from "../contexts/OrderContext";
import Navbar from '@/components/Navbar';
import Script from 'next/script';
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
        {/* 여기에 직접 script 태그 삽입 */}
        <script
          src="https://klicklab-sdk.pages.dev/klicklab_sdk.js"
          data-sdk-key="f2719562-c64d-4175-aa3e-b66caad59d79"
        ></script>
       
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
