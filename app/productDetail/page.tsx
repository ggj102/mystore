"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import productDetailStyles from "@styles/pages/productDetail/productDetail.module.scss";

import { productDetailFetch } from "@/src/application/useCaseProduct";
import { detailFetch } from "@/src/adaptter/api";
import { ProductType } from "@/src/domain/product";

import Timer from "@/components/timer";

import TopContents from "./components/topContents/topContents";
import BottomContents from "./components/bottomContents/bottomContents";

export default function ProductDetailPage() {
  const [productData, setproductData] = useState<ProductType>();

  const [currentCount, setCurrentCount] = useState<number>(1);

  const searchParams = useSearchParams().get("id");
  const router = useRouter();

  // const dispatch = useDispatch();

  const onClickIncreaseCurrentCount = () => {
    setCurrentCount(currentCount + 1);
  };

  const onClickDecreaseCurrentCount = () => {
    if (currentCount > 1) setCurrentCount(currentCount - 1);
  };

  const onChangeCurrentCount = (e: any) => {
    const regex = /^[0-9]*$/;

    if (!regex.test(e.target.value)) return;
    else setCurrentCount(Number(e.target.value));
  };

  const onClickAddCart = () => {
    if (currentCount === 0) {
      alert("수량이 부족합니다. (최소 수량: 1개)");
      return;
    }

    // if (productData) {
    //   dispatch(addCartAction({ product: productData, count: currentCount }));
    // }

    const isConfirm = confirm("장바구니 페이지로 이동하시겠습니까?");
    if (isConfirm) router.push("/cart");
  };

  useEffect(() => {
    if (searchParams) {
      const id = Number(searchParams);
      productDetailFetch(id, detailFetch).then((data) => {
        setproductData(data);
      });
    }
  }, []);

  return (
    <div className={productDetailStyles.product_detail_container}>
      <div className="site_wrap">
        <TopContents />
        <BottomContents />
      </div>
    </div>
  );
}
