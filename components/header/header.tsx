"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

import HeaderPrimary from "./headerPrimary";
import Navigation from "./navigation";

import headerStyle from "@styles/components/header/header.module.scss";

export default function Header({ userData }: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef);

  return (
    <>
      <div ref={targetRef} className={headerStyle.header_container}>
        <HeaderPrimary data={userData} />
        <Navigation />
      </div>
      {!isInView && targetRef && (
        <div className={headerStyle.nav_area}>
          <Navigation isSticky />
        </div>
      )}
    </>
  );
}
