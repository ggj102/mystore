"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";

import { priceFormatter } from "@/utils/priceFormatter";
import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { getRecentlyViewAction } from "./userActions";

import { MdArrowForwardIos } from "react-icons/md";
import userStyle from "@styles/pages/user/user.module.scss";

export default function UserInterest({ title }: { title: string }) {
  const [listData, setListData] = useState<ProductType[]>([]);

  const limitLength = (num: number) => {
    return listData.length > num ? num : listData.length;
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: limitLength(4),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: { slidesToShow: limitLength(3) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: limitLength(2) },
      },
      {
        breakpoint: 500,
        settings: { slidesToShow: limitLength(1) },
      },
    ],
  };

  async function getData() {
    try {
      if (title === "찜한") {
      } else if (title === "최근 본") {
        const data = await getRecentlyViewAction();

        setListData(data);
      }
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={userStyle.interest_list}>
      <div className="title_wrap">
        <h3>{title} 상품</h3>
        <span>{listData.length}</span>
      </div>
      <div className={userStyle.slider_container}>
        <Slider {...settings}>
          {listData.map((val: ProductType, idx: number) => {
            return (
              <div key={idx} className={userStyle.product_item}>
                <div className={userStyle.product_item_container}>
                  <Link href={`/productDetail/${val.id}`}>
                    <div className={userStyle.item_img}>
                      <img width="100%" src={val.image_path} alt="item" />
                    </div>
                  </Link>
                  <div className={userStyle.item_info}>
                    <div>
                      <span className={userStyle.item_price}>
                        {`${priceFormatter(val.price)}원`}
                      </span>
                    </div>
                    <Link href="/productDetail">
                      <span className={userStyle.item_name}>{val.name}</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      {title === "찜한" && (
        <Link href="" className="all">
          <span>찜한 상품 모두 보기</span>
          <MdArrowForwardIos size={12} />
        </Link>
      )}
    </div>
  );
}
