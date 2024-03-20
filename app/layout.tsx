import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

// import StoreProvider from "./StoreProvider";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
    // <StoreProvider>
    //   <html lang="en">
    //     <body className={inter.className}>
    //       <Navigation />
    //       {children}
    //       <Footer />
    //     </body>
    //   </html>
    // </StoreProvider>
  );
}
