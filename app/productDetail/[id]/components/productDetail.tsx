"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import productDetailStyles from "@styles/pages/productDetail/productDetail.module.scss";

import { productDetailFetch } from "@/src/application/useCaseProduct";
import { detailFetch } from "@/src/adaptter/api";
import { ProductType } from "@/src/domain/product";

import TopContents from "./topContents/topContents";
import BottomContents from "./bottomContents/bottomContents";
import axios from "axios";

export default function ProductDetail() {
  const [productDetailData, setProductDetailData] = useState<any>([]);

  const [currentCount, setCurrentCount] = useState<number>(1);

  const pathname = usePathname();
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
    const split = pathname.split("/");
    const id = split[2];

    axios.get(`http://localhost:3005/productDetail/${id}`).then((res: any) => {
      console.log(res.data, "상세정보");
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
