"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import NavBar from "./navBar";
import NavOpenBar from "../navOpenBar";

import navigationStyle from "@styles/components/header/navigation/navigation.module.scss";

export default function Navigation({ isSticky }: { isSticky?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSearchBar, setIsSearchBar] = useState<boolean>(false);

  const onClickIsNavOpen = () => {
    if (!isNavOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";

    setIsNavOpen(!isNavOpen);
    setIsSearchBar(false);
  };

  const onClickSearchBarOpen = () => {
    if (!isSearchBar) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";

    setIsSearchBar(!isSearchBar);
    setIsNavOpen(false);
  };

  const onClickBarClose = () => {
    document.body.style.overflow = "auto";
    setIsSearchBar(false);
    setIsNavOpen(false);
  };

  useEffect(() => {
    onClickBarClose();
  }, [pathname, searchParams]);

  return (
    <div className={navigationStyle.navigation_container}>
      <NavBar
        isSticky={isSticky}
        isNavOpen={isNavOpen}
        isSearchBar={isSearchBar}
        onClickIsNavOpen={onClickIsNavOpen}
        onClickSearchBarOpen={onClickSearchBarOpen}
      />
      {(isNavOpen || isSearchBar) && (
        <NavOpenBar
          isNavOpen={isNavOpen}
          isSearchBar={isSearchBar}
          onClickBarClose={onClickBarClose}
          onClickSearchBarOpen={onClickSearchBarOpen}
        />
      )}
    </div>
  );
}
