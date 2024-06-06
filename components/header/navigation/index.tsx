"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import NavItem from "./navItem";
import MenuToggle from "./menuToggle";
import NavOpenBar from "./navOpenBar";

import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import navigationStyles from "@styles/components/navigation.module.scss";

export default function Navigation({ isSticky }: { isSticky?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);

  const categoryData = [
    { id: 1, name: "홈", link: "/" },
    {
      id: 2,
      name: "전체상품",
      link: "/allProduct?page=1",
      children: [
        {
          id: 21,
          name: "클렌징",
          link: "/allProduct?category=cleansing&page=1",
        },
        {
          id: 22,
          name: "부스터/토너",
          link: "/allProduct?category=booster_toner&page=1",
        },
        {
          id: 23,
          name: "앰플/에센스",
          link: "/allProduct?category=ampoule_essence&page=1",
        },
        { id: 24, name: "크림", link: "/allProduct?category=cream&page=1" },
        {
          id: 25,
          name: "팩/마스크",
          link: "/allProduct?category=pack_mask&page=1",
        },
        { id: 26, name: "미스트", link: "/allProduct?category=mist&page=1" },
        {
          id: 27,
          name: "선케어",
          link: "/allProduct?category=sun_care&page=1",
        },
        {
          id: 28,
          name: "쿠션/베이스",
          link: "/allProduct?category=cushion_base&page=1",
        },
      ],
    },
    { id: 3, name: "타임특가", link: "/timeSaleProduct?page=1" },
  ];

  const onClickIsNavOpen = () => {
    if (!isNavOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";

    setIsNavOpen(!isNavOpen);
    setIsSearchBarOpen(false);
  };

  const onClickIsSearchBarOpen = () => {
    if (!isSearchBarOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";

    setIsSearchBarOpen(!isSearchBarOpen);
    setIsNavOpen(false);
  };

  const onClickAddBarClose = () => {
    document.body.style.overflow = "auto";
    setIsSearchBarOpen(false);
    setIsNavOpen(false);
  };

  const onClickSearch = () => {
    router.push(`/searchResult?keyword=${currentKeyword}&page=1`);
  };

  const onKeyUpSearch = (e: any) => {
    if (e.key === "Enter") onClickSearch();
  };

  useEffect(() => {
    onClickAddBarClose();
  }, [pathname, searchParams]);

  return (
    <div className={navigationStyles.navigation_container}>
      <div className={navigationStyles.navigation_bar}>
        <div className={navigationStyles.navigation}>
          <div>
            <Link className={isSticky ? "show_logo" : "hide_logo"} href="/">
              <img src="/images/logo.png" alt="logo" />
            </Link>
            <MenuToggle isNavOpen={isNavOpen} toggle={onClickIsNavOpen} />
          </div>
          <div className={navigationStyles.nav_items}>
            {categoryData.map((val) => {
              return (
                <NavItem
                  key={val.id}
                  data={val}
                  isBarOpen={isNavOpen || isSearchBarOpen}
                />
              );
            })}
          </div>
        </div>
        <div className={navigationStyles.user_operation}>
          <button onClick={onClickIsSearchBarOpen}>
            <FiSearch size={35} />
          </button>
          <Link href="/user">
            <FaRegUser size={33} />
          </Link>
          <Link className="cart_link" href="/cart">
            <div>0</div>
            <BsCart2 size={36} />
          </Link>
        </div>
      </div>
      {(isNavOpen || isSearchBarOpen) && (
        <div className={clsx({ column_bar: isNavOpen })}>
          <div className={navigationStyles.add_bar}>
            <button className="column_bar_close" onClick={onClickAddBarClose}>
              <ImCross size={22} color="#fff" />
            </button>
            <div className="site_wrap">
              {isNavOpen && <NavOpenBar categoryData={categoryData} />}
              {isSearchBarOpen && (
                <div className={navigationStyles.search_bar}>
                  <strong>SEARCH</strong>
                  <div className="search_input">
                    <input
                      value={currentKeyword}
                      onChange={(e) => setCurrentKeyword(e.target.value)}
                      onKeyUp={onKeyUpSearch}
                    />
                    <button onClick={onClickSearch}>
                      <FiSearch size={28} />
                    </button>
                  </div>
                  <button onClick={onClickIsSearchBarOpen}>
                    <ImCross size={22} />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="backdrop" onClick={onClickAddBarClose}></div>
        </div>
      )}
    </div>
  );
}
