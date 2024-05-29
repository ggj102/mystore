"use client";

import { useRef } from "react";
import Link from "next/link";

import { useInView } from "framer-motion";

import useObserver from "@/utils/useObserver";
import Navigation from "./navigation";

import headerStyle from "@styles/components/header.module.scss";
import { signoutAction } from "./headerActions";
import { useRouter } from "next/navigation";

export default function Header({ userData }: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { observeWidth } = useObserver(targetRef);
  const router = useRouter();

  const isMedium = observeWidth < 1000;
  const isInView = useInView(targetRef);

  const onClickSignout = async () => {
    signoutAction();
    router.refresh();
  };

  return (
    <>
      <div
        ref={targetRef}
        className={`${headerStyle.header_container} ${
          isMedium ? headerStyle.sticky_header : ""
        }`}
      >
        <div className="site_wrap">
          <div className={headerStyle.header_logo}>
            <Link href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
            {userData ? (
              <div>
                <span>{userData.user_name}님</span>
                <button onClick={onClickSignout}>Sign out</button>
              </div>
            ) : (
              <div>
                <Link href="/signin">Sign in</Link>
                <Link href="/signup">Sign up</Link>
              </div>
            )}
          </div>
        </div>
        <Navigation />
      </div>
      {!isInView && !isMedium && (
        <div className={headerStyle.nav_area}>
          <Navigation isSticky />
        </div>
      )}
    </>
  );
}
