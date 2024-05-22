"use client";

import Navigation from "./navigation";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";

import headerStyle from "@styles/components/header.module.scss";
import useObserver from "@/utils/useObserver";

export default function Header() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { observeWidth } = useObserver(targetRef);

  const isMedium = observeWidth < 1000;

  const isInView = useInView(targetRef);

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
            <Link href="/signin">Log in</Link>
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
