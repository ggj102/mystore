"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Select from "react-select";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Pagination from "@/components/pagination";

import { FiSearch } from "react-icons/fi";
import searchResultStyle from "@styles/pages/searchResult.module.scss";

interface SearchResultProps {
  searchResultData: {
    data: ProductType[];
    totalPages: number;
    totalCount: number;
  };
  keyword: string;
  sort?: string;
  page: number;
}

export default function SearchResult({
  searchResultData,
  keyword,
  sort,
  page,
}: SearchResultProps) {
  const { data, totalPages, totalCount } = searchResultData;
  const router = useRouter();

  const [currentKeyword, setCurrentKeyword] = useState<string>(keyword);
  const [currentSort, setCurrentSort] = useState<SelectOptionType>({
    value: "popularity_desc",
    label: "인기도",
  });

  const options = [
    { value: "popularity_desc", label: "인기도" },
    { value: "new_desc", label: "신상품" },
    { value: "name_asc", label: "상품명" },
    { value: "price_asc", label: "낮은가격" },
    { value: "price_desc", label: "높은가격" },
    // { value: "5", label: "제조사" },
    // { value: "6", label: "사용후기" },
  ];

  const setSort = (sort: string | undefined) => {
    const sortValue = sort ? sort : "popularity_desc";
    const filter = options.filter((val) => val.value === sortValue);

    setCurrentSort(filter[0]);
  };

  const onChangeSort = (newValue: SelectOptionType) => {
    if (newValue.value === currentSort.value) return;

    const pushPath = `/searchResult?keyword=${currentKeyword}&sort=${newValue.value}&page=1`;

    router.push(pushPath);
  };

  const onClickSearch = () => {
    router.push(`/searchResult?keyword=${currentKeyword}&page=1`);
  };

  const onKeyUpSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onClickSearch();
  };

  useEffect(() => setSort(sort), [sort]);

  return (
    <div className={searchResultStyle.search_result_container}>
      <div className="site_wrap">
        <div className={searchResultStyle.title_bar}>
          <ViewInUp once={true}>
            <h3>상품검색</h3>
          </ViewInUp>
          <div className={searchResultStyle.search_input}>
            <input
              placeholder="검색어를 입력해 주세요."
              value={currentKeyword}
              onChange={(e) => setCurrentKeyword(e.target.value)}
              onKeyUp={onKeyUpSearch}
            />
            <button type="button" title="검색" onClick={onClickSearch}>
              <FiSearch size={28} />
            </button>
          </div>
        </div>
      </div>
      <div className="site_wrap">
        {data.length > 0 ? (
          <div className={searchResultStyle.search_result_list}>
            <div>
              <div className={searchResultStyle.product_count}>
                검색 결과
                <strong> {totalCount}</strong>건
              </div>
              <Select
                isSearchable={false}
                options={options}
                value={currentSort}
                onChange={onChangeSort}
              />
            </div>
            <ul>
              {data.map((val: ProductType, idx: number) => {
                return (
                  <li key={idx}>
                    <ProductItem data={val} />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className={searchResultStyle.no_result}>
            {`'${keyword}' 에 대한 검색 결과가 없습니다.`}
          </div>
        )}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={page} />
        )}
      </div>
    </div>
  );
}
