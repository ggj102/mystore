import Link from "next/link";
import { navData } from "../navData";

import NavItem from "./navItem";
import MenuToggle from "./menuToggle";

import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";

import navigationStyle from "@styles/components/header/navigation/navigation.module.scss";
import RevalidateLink from "@/components/revalidateLink";

export default function NavBar({
  isSticky,
  isNavOpen,
  isSearchBar,
  onClickIsNavOpen,
  onClickSearchBarOpen,
}: {
  isSticky?: boolean;
  isNavOpen: boolean;
  isSearchBar: boolean;
  onClickIsNavOpen: () => void;
  onClickSearchBarOpen: () => void;
}) {
  return (
    <div className={navigationStyle.nav_bar_container}>
      <div className={navigationStyle.navigation}>
        <div>
          <Link className={isSticky ? "show_logo" : "hide_logo"} href="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
          <MenuToggle isNavOpen={isNavOpen} toggle={onClickIsNavOpen} />
        </div>
        <div className={navigationStyle.nav_items}>
          {navData.map((val) => {
            return (
              <NavItem
                key={val.id}
                data={val}
                isBarOpen={isNavOpen || isSearchBar}
              />
            );
          })}
        </div>
      </div>
      <div className={navigationStyle.nav_contents}>
        <button title="검색" onClick={onClickSearchBarOpen}>
          <FiSearch size={35} />
        </button>
        <RevalidateLink title="마이페이지" href="/user">
          <FaRegUser size={33} />
        </RevalidateLink>
        <RevalidateLink title="장바구니" className="cart_link" href="/cart">
          <BsCart2 size={36} />
        </RevalidateLink>
      </div>
    </div>
  );
}
