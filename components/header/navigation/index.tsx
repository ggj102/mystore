import { useEffect, useState } from "react";
import Link from "next/link";

import MenuToggle from "./menuToggle";
import NavOpenBarTable from "./navOpenBarTable";

import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { ImCross } from "react-icons/im";

import navigationStyles from "@styles/components/navigation.module.scss";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);

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

  useEffect(() => {
    onClickAddBarClose();
  }, [pathname]);

  return (
    <div className={navigationStyles.navigation_container}>
      <div className={navigationStyles.navigation_bar}>
        <div className={navigationStyles.navigation}>
          <MenuToggle isNavOpen={isNavOpen} toggle={onClickIsNavOpen} />
          <Link href="/">홈</Link>
          <Link href="/allProduct">전체 상품</Link>
          <Link href="/timeSaleProduct">타임 특가</Link>
          <Link href="/productDetail">상품 상세</Link>
          <Link href="/order">주문하기</Link>
          <Link href="/orderComplete">주문완료</Link>
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
        <div>
          <div className={navigationStyles.add_bar}>
            <div className="site_wrap">
              {isNavOpen && (
                <div className={navigationStyles.nav_open_bar}>
                  <NavOpenBarTable />
                  <div className="user_nav">
                    <Link href="">
                      <strong>마이페이지</strong>
                    </Link>
                    <div>
                      <Link href="">회원정보 수정</Link>
                      <Link href="">관심상품</Link>
                      <Link href="">최근 본 상품</Link>
                      <Link href="">배송 주소록 관리</Link>
                    </div>
                  </div>
                </div>
              )}
              {isSearchBarOpen && (
                <div className={navigationStyles.search_bar}>
                  <strong>SEARCH</strong>
                  <div className="search_input">
                    <button>
                      <FiSearch size={28} />
                    </button>
                    <input />
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
