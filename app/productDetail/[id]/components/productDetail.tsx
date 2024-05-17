"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";

import TopContents from "./topContents/topContents";
import BottomContents from "./bottomContents/bottomContents";

import productDetailStyles from "@styles/pages/productDetail/productDetail.module.scss";

export default function ProductDetail() {
  const [productDetailData, setProductDetailData] = useState<any>({});

  const pathname = usePathname();

  useEffect(() => {
    const split = pathname.split("/");
    const id = split[2];

    axios.get(`http://localhost:3005/productDetail/${id}`).then((res: any) => {
      setProductDetailData(res.data);
    });
  }, []);

  return (
    <div className={productDetailStyles.product_detail_container}>
      <div className="site_wrap">
        <TopContents productDetailData={productDetailData} />
        <BottomContents productDetailData={productDetailData} />
      </div>
    </div>
  );
}
