"use client";
import { useEffect } from "react";
import { recentlyViewAction } from "./productDetailActions";

import TopContents from "./topContents/topContents";
import BottomContents from "./bottomContents/bottomContents";

import productDetailStyles from "@styles/pages/productDetail/productDetail.module.scss";

export default function ProductDetail({ productDetailData }: any) {
  async function addRecentlyView() {
    const id = parseInt(productDetailData.id);
    await recentlyViewAction(id);
  }

  useEffect(() => {
    if (productDetailData) addRecentlyView();
  }, [productDetailData]);

  return (
    <div className={productDetailStyles.product_detail_container}>
      <div className="site_wrap">
        <TopContents data={productDetailData} />
        <BottomContents data={productDetailData} />
      </div>
    </div>
  );
}
