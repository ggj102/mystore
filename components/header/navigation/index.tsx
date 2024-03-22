import { KeyboardEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);

  const categoryData = [
    { id: 1, name: "홈", link: "/" },
    {
      id: 2,
      name: "전체상품",
      link: "/allProduct",
      children: [
        {
          id: 21,
          name: "토너",
          children: [
            { id: 21, name: "2" },
            { id: 22, name: "크림" },
            { id: 23, name: "선케어" },
            { id: 24, name: "마스크" },
            { id: 25, name: "클렌징" },
            {
              id: 26,
              name: "55",
              children: [
                { id: 21, name: "555" },
                { id: 22, name: "크림" },
                { id: 23, name: "선케어" },
                { id: 24, name: "마스크" },
                { id: 25, name: "클렌징" },
                { id: 26, name: "666" },
              ],
            },
          ],
        },
        { id: 22, name: "크림" },
        { id: 23, name: "선케어" },
        { id: 24, name: "마스크" },
        {
          id: 25,
          name: "클렌징",
          children: [
            { id: 21, name: "33" },
            { id: 22, name: "크림" },
            { id: 23, name: "선케어" },
            { id: 24, name: "마스크" },
            { id: 25, name: "클렌징" },
            { id: 26, name: "44" },
          ],
        },
        { id: 26, name: "바디" },
      ],
    },
    { id: 3, name: "타임특가", link: "/timeSaleProduct" },
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
    router.push(`/searchResult`);
  };

  const onKeyDownSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/searchResult`);
    }
  };

  useEffect(() => {
    onClickAddBarClose();
  }, [pathname]);

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
                  isAddBarOpen={isNavOpen || isSearchBarOpen}
                />
              );
            })}
            <Link href="/productDetail">상품 상세</Link>
            <Link href="/order">주문하기</Link>
            <Link href="/orderComplete">주문완료</Link>
          </div>
        </div>
        <div className={navigationStyles.user_operation}>
          <button onClick={onClickIsSearchBarOpen}>
            <FiSearch size={35} />
          </button>
          <Link href="">
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
                    <button onClick={onClickSearch}>
                      <FiSearch size={28} />
                    </button>
                    <input onKeyDown={onKeyDownSearch} />
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
