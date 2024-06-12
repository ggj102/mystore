"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import HeaderPrimary from "./headerPrimary";
import Navigation from "./navigation";

import headerStyle from "@styles/components/header/header.module.scss";

export default function Header({ userData }: any) {
  const [isSticky, setIsSticky] = useState<boolean>(false);

  return (
    <>
      <motion.div
        className={headerStyle.header_container}
        onViewportEnter={() => setIsSticky(false)}
        onViewportLeave={() => setIsSticky(true)}
      >
        <HeaderPrimary data={userData} />
        <Navigation />
      </motion.div>
      {isSticky && (
        <div className={headerStyle.nav_area}>
          <Navigation isSticky />
        </div>
      )}
    </>
  );
}
