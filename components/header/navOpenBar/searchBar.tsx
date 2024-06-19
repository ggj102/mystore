"use client";
import { KeyboardEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";

import searchBarStyle from "@styles/components/header/navOpenBar/searchBar.module.scss";

export default function SearchBar({
  onClickSearchBarOpen,
}: {
  onClickSearchBarOpen: () => void;
}) {
  const router = useRouter();
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResult?keyword=${currentKeyword}&page=1`);
  };

  const onKeyUpSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickSearch();
  };

  return (
    <div className={searchBarStyle.search_bar_container}>
      <div className="site_wrap">
        <div>
          <strong>SEARCH</strong>
          <div className="search_input">
            <input
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onKeyUp={onKeyUpSearch}
            />
            <button title="검색" onClick={onClickSearch}>
              <FiSearch size={28} />
            </button>
          </div>
          <button title="닫기" onClick={onClickSearchBarOpen}>
            <ImCross size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
