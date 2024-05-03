"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Timer from "@/components/timer";

import timeSaleProductStyle from "@styles/pages/timeSaleProduct.module.scss";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination";

export default function TimeSaleProduct() {
  const [timeSaleProductList, setTimeSaleProductList] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams) {
      const paramsPageNum = searchParams.get("page");

      axios
        .get(`http://localhost:3005/timeSaleProduct?page=${paramsPageNum}`)
        .then((res: any) => {
          setTimeSaleProductList(res.data.data);
          setTotalPages(res.data.totalPages);
          setTotalCount(res.data.totalCount);
          setCurrentPage(Number(paramsPageNum));
        });
    }
  }, [searchParams]);

  return (
    <div className={timeSaleProductStyle.time_sale_product_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>타임특가</h3>
        </ViewInUp>
      </div>
      <div className="site_wrap">
        <div className={timeSaleProductStyle.time_sale_product_list}>
          <div className={timeSaleProductStyle.time_sale_product_count}>
            전체
            <strong> {totalCount}</strong>개
          </div>
          <ul>
            {timeSaleProductList.map((val: any, idx: number) => {
              return (
                <li key={idx}>
                  <div className={timeSaleProductStyle.timer}>
                    <Timer limitDate={val.time_sale} />
                  </div>
                  <ProductItem data={val} />
                </li>
              );
            })}
          </ul>
        </div>
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}
