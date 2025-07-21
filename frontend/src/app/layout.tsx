import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../contexts/CartContext";
import { WishlistProvider } from "../contexts/WishlistContext";
import { OrderProvider } from "../contexts/OrderContext";
import Navbar from '@/components/Navbar';
import ClientScriptInit from "./ClientScriptInit";
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
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script type="module" src="https://klicklab-sdk.pages.dev/klicklab_sdk.js"
      data-sdk-key="7ea40a3f-e0eb-475b-a787-2fbbd7f9aa98"></script>
         {/* <ClientScriptInit />  */}
         {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         ------해당 컴포넌트 추가-------- */}

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
