"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { signoutAction } from "./headerActions";

import headerStyle from "@styles/components/header/header.module.scss";

export default function HeaderPrimary({ data }: any) {
  const router = useRouter();

  const onClickSignout = async () => {
    signoutAction();
    router.refresh();
  };

  return (
    <div className="site_wrap">
      <div className={headerStyle.header_logo}>
        <Link href="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
        {data ? (
          <div>
            <span>
              <p>{data.name}</p>님
            </span>
            <button onClick={onClickSignout}>로그아웃</button>
          </div>
        ) : (
          <div>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </div>
    </div>
  );
}
