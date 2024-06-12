"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

import useObserver from "@/utils/useObserver";

import Navigation from "./navigation";

import headerStyle from "@styles/components/header/header.module.scss";
import HeaderPrimary from "./headerPrimary";

export default function Header({ userData }: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { observeWidth } = useObserver();

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
        <HeaderPrimary data={userData} />
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
