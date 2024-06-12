"use client";

import Link from "next/link";
import useObserver from "@/utils/useObserver";

import NavOpenBarTable from "./navOpenBarTable";

import navigationStyles from "@styles/components/header/navigation.module.scss";

import FoldList from "./foldList";

function CreateCategory({ data }: any) {
  if (data) {
    return (
      <ul>
        {data.map((val: any) => {
          return (
            <FoldList data={val} key={val.id}>
              <CreateCategory data={val.children} />
            </FoldList>
          );
        })}
      </ul>
    );
  } else return;
}

export default function NavOpenBar({ categoryData }: any) {
  const { observeWidth } = useObserver();
  const isMedium = observeWidth < 1000;

  return (
    <div>
      {isMedium ? (
        <div className={navigationStyles.nav_open_column_bar}>
          <div>
            <Link href="/signin">Sign in</Link>
          </div>
          <CreateCategory data={categoryData} />
        </div>
      ) : (
        <div className={navigationStyles.nav_open_bar}>
          <NavOpenBarTable />
          <div className="user_nav">
            <Link href="">
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
      )}
    </div>
  );
}
