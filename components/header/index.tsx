"use client";

import headerStyle from "@styles/components/header.module.scss";
import Navigation from "./navigation";
import Link from "next/link";

export default function Header() {
  return (
    <div className={headerStyle.header_container}>
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
  );
}
