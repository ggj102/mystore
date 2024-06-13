"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Select, { SingleValue } from "react-select";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Pagination from "@/components/pagination";

import allProductStyle from "@styles/pages/allProduct.module.scss";

export default function AllProduct({
  allProductData,
  category,
  sort,
  page,
}: {
  allProductData: {
    data: ProductType[];
    totalPages: number;
    totalCount: number;
  };
  category: string;
  sort?: string;
  page: number;
}) {
  const { data, totalPages, totalCount } = allProductData;
  const router = useRouter();

  const [currentCategory, setCurrentCategory] = useState<string>(category);
  const [currentSort, setCurrentSort] = useState<SingleValue<SelectOption>>({
    value: "popularity_desc",
    label: "인기도",
  });

  const categoryArr = [
    { name: "전체", category: "" },
    { name: "클렌징", category: "cleansing" },
    { name: "부스터/토너", category: "booster_toner" },
    { name: "앰플/에센스", category: "ampoule_essence" },
    { name: "크림", category: "cream" },
    { name: "팩/마스크", category: "pack_mask" },
    { name: "미스트", category: "mist" },
    { name: "선케어", category: "sun_care" },
    { name: "쿠션/베이스", category: "cushion_base" },
  ];

  const options = [
    { value: "popularity_desc", label: "인기도" },
    { value: "new_desc", label: "신상품" },
    { value: "name_asc", label: "상품명" },
    { value: "price_asc", label: "낮은가격" },
    { value: "price_desc", label: "높은가격" },
    // { value: "5", label: "제조사" },
    // { value: "6", label: "사용후기" },
  ];

  const setSort = (sort?: string) => {
    const sortValue = sort ? sort : "popularity_desc";
    const filter = options.filter((val) => val.value === sortValue);

    setCurrentSort(filter[0]);
  };

  const onChangeSort = (newValue: SingleValue<SelectOption>) => {
    if (newValue?.value === currentSort?.value) return;

    const category = currentCategory ? `category=${currentCategory}` : "";
    const sort = `sort=${newValue?.value}`;

    const filter = [category, sort].filter((val) => val);
    const query = filter.join("&");

    const pushPath = `/allProduct?${query}&page=1`;

    router.push(pushPath);
  };

  useEffect(() => setSort(sort), [sort]);
  useEffect(() => setCurrentCategory(category), [category]);

  return (
    <div className={allProductStyle.all_product_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>전체 상품</h3>
        </ViewInUp>
      </div>
      <div className="site_wrap">
        <ul className={allProductStyle.all_product_category}>
          {categoryArr.map((val, idx) => {
            const { name, category } = val;
            const link =
              name === "전체"
                ? `/allProduct?page=1`
                : `/allProduct?category=${category}&page=1`;

            const style =
              val.category === currentCategory
                ? allProductStyle.current_category
                : "";

            return (
              <li key={idx} className={style}>
                <Link href={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="site_wrap">
        <div className={allProductStyle.all_product_list}>
          <div>
            <div className={allProductStyle.product_count}>
              전체
              <strong> {totalCount}</strong>개
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
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={page} />
      )}
    </div>
  );
}
