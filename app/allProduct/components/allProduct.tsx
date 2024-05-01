"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import allProductStyle from "@styles/pages/allProduct.module.scss";
import CustomSelect from "@/components/customSelect";

export default function AllProduct() {
  const [allProductList, setAllProductList] = useState<any>([]);
  const searchParams = useSearchParams();

  const categoryArr = [
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
    { value: "0", label: "-정렬선택-" },
    { value: "1", label: "신상품" },
    { value: "2", label: "상품명" },
    { value: "3", label: "낮은가격" },
    { value: "4", label: "높은가격" },
    // { value: "5", label: "제조사" },
    // { value: "6", label: "사용후기" },
  ];

  useEffect(() => {
    if (searchParams) {
      const pageNum = searchParams.get("page");
      const category = searchParams.get("category");
      const query = category
        ? `category=${category}&page=${pageNum}`
        : `page=${pageNum}`;

      axios
        .get(`http://localhost:3005/productList?${query}`)
        .then((res: any) => {
          setAllProductList(res.data);
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

            return (
              <li key={idx}>
                <Link href={`/allProduct?category=${category}&page=1`}>
                  {name}
                </Link>
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
              <strong> {allProductList.length}</strong>개
            </div>
            <CustomSelect options={options} />
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
    </div>
  );
}
