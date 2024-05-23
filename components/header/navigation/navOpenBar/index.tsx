"use client";

import Link from "next/link";
import useObserver from "@/utils/useObserver";

import NavOpenBarTable from "./navOpenBarTable";

import navigationStyles from "@styles/components/navigation.module.scss";

import FoldList from "./foldList";
import { useRef } from "react";

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
  const targetRef = useRef<any>(null);
  const { observeWidth } = useObserver(targetRef);
  const isMedium = observeWidth < 1000;

  return (
    <div ref={targetRef}>
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
              <Link href="">회원정보 수정</Link>
              <Link href="">관심상품</Link>
              <Link href="">최근 본 상품</Link>
              <Link href="">배송 주소록 관리</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
