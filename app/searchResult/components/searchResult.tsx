"use client";

import Select from "react-select";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";

import { FiSearch } from "react-icons/fi";

import searchResultStyle from "@styles/pages/searchResult.module.scss";

export default function SearchResult() {
  const testBestsellerData = [
    {
      name: "스킨 하이드로 트리트먼트",
      discription: "즉각 수분진정 효과로 쉽고 간편하게 피부 스트레스를 케어",
      saleprice: 209000,
      sale: 28,
      price: 290000,
    },
    {
      name: "에센스 UV 프로텍터",
      discription: "보습부터 자외선 차단까지 순한 데일리 선크림",
      saleprice: 49500,
      sale: 5,
      price: 52000,
    },
    {
      name: "타투 퍼퓸 패키지",
      discription: "향기와 함께 마음을 전해보세요",
      saleprice: 44000,
      sale: 25,
      price: 59000,
    },
    {
      name: "우드 헤어 브러쉬",
      discription: "트리트먼트와 같이 쓰면 더욱 좋은 우드 브러쉬",
      saleprice: 29000,
      sale: 28,
      price: 20900,
    },
  ];

  const concat1 = testBestsellerData.concat(testBestsellerData);
  const concat2 = concat1.concat(concat1);

  const options = [
    { value: "0", label: "-정렬선택-" },
    { value: "1", label: "신상품" },
    { value: "2", label: "상품명" },
    { value: "3", label: "낮은가격" },
    { value: "4", label: "높은가격" },
    { value: "5", label: "제조사" },
    { value: "6", label: "사용후기" },
  ];

  return (
    <div className={searchResultStyle.search_result_container}>
      <div className="site_wrap">
        <div className={searchResultStyle.title_bar}>
          <ViewInUp once={true}>
            <h3>상품검색</h3>
          </ViewInUp>
          <div className={searchResultStyle.search_input}>
            <input />
            <FiSearch size={28} />
          </div>
        </div>
      </div>
      <div className="site_wrap">
        <div className={searchResultStyle.search_result_list}>
          <div>
            <div className={searchResultStyle.product_count}>
              상품 검색 결과
              <strong> {concat2.length}</strong>건
            </div>
            <Select
              isSearchable={false}
              defaultValue={options[0]}
              options={options}
            />
          </div>
          <ul>
            {concat2.map((val, idx) => {
              return (
                <li key={idx}>
                  <ProductItem data={val} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
