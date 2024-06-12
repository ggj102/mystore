"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";

import searchBarStyle from "@styles/components/header/navOpenBar/searchBar.module.scss";

export default function SearchBar({ onClickSearchBarOpen }: any) {
  const router = useRouter();
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  const onClickSearch = () => {
    router.push(`/searchResult?keyword=${currentKeyword}&page=1`);
  };

  const onKeyUpSearch = (e: any) => {
    if (e.key === "Enter") onClickSearch();
  };

  return (
    <div className={searchBarStyle.search_bar_container}>
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
      <button onClick={onClickSearchBarOpen}>
        <ImCross size={22} />
      </button>
    </div>
  );
}
