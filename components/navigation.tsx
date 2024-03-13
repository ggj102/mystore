import Link from "next/link";

import navigationStyles from "../styles/components/navigation.module.scss";

export default function Navigation() {
  return (
    <div className={navigationStyles.navigation_container}>
      <Link href="/">홈</Link>
      <Link href="/allProduct">전체 상품</Link>
      <Link href="/timeSaleProduct">타임 특가</Link>
      <Link href="/cart">장바구니</Link>
      <Link href="/payment">결제</Link>
    </div>
  );
}
