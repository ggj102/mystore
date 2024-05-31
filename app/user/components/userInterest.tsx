"use client";

import { useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";

import { priceFormatter } from "@/utils/priceFormatter";
import useObserver from "@/utils/useObserver";

import { MdArrowForwardIos } from "react-icons/md";
import userStyle from "@styles/pages/user/user.module.scss";

export default function UserInterest({
  targetRef,
  title,
  homeData,
}: {
  targetRef: any;
  title: string;
  homeData: any;
}) {
  const { observeWidth } = useObserver(targetRef);

  const isMedium = observeWidth < 1000;
  const isSmall = observeWidth < 768;
  const isMini = observeWidth < 500;

  const sildesSize = () => {
    let size = 5;
    if (isMedium) {
      size = 4;
    }
    if (isSmall) {
      size = 3;
    }
    if (isMini) {
      size = 2;
    }

    return size;
  };

  useEffect(() => {
    console.log(homeData);
  }, [homeData]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: sildesSize(),
    slidesToScroll: 1,
  };

  return (
    <div className={userStyle.interest_list}>
      <div className="title_wrap">
        <h3>{title} 상품</h3>
        <span>1</span>
      </div>
      <div className={userStyle.slider_container}>
        <Slider {...settings}>
          {homeData.newProduct.map((val: any, idx: number) => {
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
