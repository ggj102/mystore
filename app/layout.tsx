import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ContextProvider from "./context";
import Loading from "./loading";
import MainLayout from "@/components/mainLayout";
import Footer from "@/components/footer";
import ActionLoading from "@/components/loading/actionLoading";

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
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <Suspense fallback={<Loading />}>
            <MainLayout>{children}</MainLayout>
            <Footer />
            <ActionLoading />
          </Suspense>
        </ContextProvider>
      </body>
    </html>
  );
}
