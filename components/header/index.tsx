"use client";

import headerStyle from "@styles/components/header.module.scss";
import Navigation from "./navigation";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function Header() {
  const isMedium = useMediaQuery("only screen and (max-width : 1000px)");
  const targetRef = useRef<HTMLDivElement>(null);
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
            <Link href="">Log in</Link>
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
