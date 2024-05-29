import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

import StoreProvider from "./StoreProvider";
import MainLayout from "@/components/mainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Store",
  description: "상품 판매 사이트 포트폴리오 ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <Suspense>
            <MainLayout>{children}</MainLayout>
            <Footer />
          </Suspense>
        </body>
      </html>
    </StoreProvider>
  );
}
