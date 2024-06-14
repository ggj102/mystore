import Link from "next/link";

import { navData } from "../navData";

import horizonOpenBarStyle from "@styles/components/header/navOpenBar/horizonOpenBar.module.scss";

function SubNav({ data }: { data: NavLinkData[] }) {
  return (
    <ul className="sub_nav">
      {data.map((val: NavLinkData) => {
        return (
          <li key={val.id}>
            <Link href={val.link}>{val.name}</Link>{" "}
          </li>
        );
      })}
    </ul>
  );
}

export default function HorizonOpenBar() {
  return (
    <div className={horizonOpenBarStyle.horizon_open_bar}>
      <ul>
        {navData.map((val) => {
          return (
            <li key={val.id}>
              <Link href={val.link}>{val.name}</Link>
              {val.children && <SubNav data={val.children} />}
            </li>
          );
        })}
      </ul>
      <div className={horizonOpenBarStyle.user_nav}>
        <Link href="/user">
          <strong>마이페이지</strong>
        </Link>
        <div>
          <Link href="/user/order">주문내역</Link>
          <Link href="/cart">장바구니</Link>
          <Link href="/user/delivery">배송지 관리</Link>
          <Link href="/user">최근 본 상품</Link>
        </div>
      </div>
    </div>
  );
}
