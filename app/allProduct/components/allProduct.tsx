"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import Select from "react-select";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Pagination from "@/components/pagination";

import allProductStyle from "@styles/pages/allProduct.module.scss";

export default function AllProduct() {
  const [allProductList, setAllProductList] = useState<any>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<any>({
    value: "popularity_desc",
    label: "인기도",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const searchParams = useSearchParams();
  const router = useRouter();

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

  const setSort = (sort: string | null) => {
    const sortValue = sort ? sort : "popularity_desc";
    const filter = options.filter((val) => val.value === sortValue);

    setCurrentSort(filter[0]);
  };

  const onChangeSort = (e: any) => {
    if (e.value === currentSort.value) return;

    const category = currentCategory ? `category=${currentCategory}` : "";
    const sort = `sort=${e.value}`;

    const filter = [category, sort].filter((val) => val);
    const query = filter.join("&");

    const pushPath = `/allProduct?${query}&page=1`;

    router.push(pushPath);
  };

  useEffect(() => {
    if (searchParams) {
      const paramsCategory = searchParams.get("category");
      const paramsSort = searchParams.get("sort");
      const paramsPageNum = searchParams.get("page");

      const category = paramsCategory ? `category=${paramsCategory}` : "";
      const sort = paramsSort ? `sort=${paramsSort}` : "";
      const page = paramsPageNum ? `page=${paramsPageNum}` : "";

      const filter = [category, sort, page].filter((val) => val);
      const query = filter.join("&");

      axios
        .get(`http://localhost:3005/productList?${query}`)
        .then((res: any) => {
          setAllProductList(res.data.data);
          setTotalPages(res.data.totalPages);
          setTotalCount(res.data.totalCount);
          setCurrentCategory(paramsCategory ? String(paramsCategory) : "");
          setSort(paramsSort);
          setCurrentPage(Number(paramsPageNum));
        });
    }
  }, [searchParams]);

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
            {allProductList.map((val: any, idx: number) => {
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
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
