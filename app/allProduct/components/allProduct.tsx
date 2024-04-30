"use client";

import Link from "next/link";
import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import allProductStyle from "@styles/pages/allProduct.module.scss";
import CustomSelect from "@/components/customSelect";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllProduct() {
  const [allProductList, setAllProductList] = useState<any>([]);

  const categoryArr = ["토너", "크림", "선케어", "마스크", "클렌징", "바디"];

  const options = [
    { value: "0", label: "-정렬선택-" },
    { value: "1", label: "신상품" },
    { value: "2", label: "상품명" },
    { value: "3", label: "낮은가격" },
    { value: "4", label: "높은가격" },
    { value: "5", label: "제조사" },
    { value: "6", label: "사용후기" },
  ];

  useEffect(() => {
    axios.get("http://localhost:3005/productList").then((res: any) => {
      setAllProductList(res.data);
    });
  }, []);

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
            return (
              <li key={idx}>
                <Link href="">{val}</Link>
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
