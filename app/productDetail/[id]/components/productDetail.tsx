"use client";

import TopContents from "./topContents/topContents";
import BottomContents from "./bottomContents/bottomContents";

import productDetailStyles from "@styles/pages/productDetail/productDetail.module.scss";

export default function ProductDetail({ productDetailData }: any) {
  return (
    <div className={productDetailStyles.product_detail_container}>
      <div className="site_wrap">
        <TopContents data={productDetailData} />
        <BottomContents data={productDetailData} />
      </div>
    </div>
  );
}
