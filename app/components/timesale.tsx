"use client";

import Slider from "react-slick";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Timer from "@/components/timer";

import timesaleStyle from "@styles/pages/home/timesale.module.scss";

export default function Timesale({ list }: any) {
  const limitLength = (num: number) => {
    return list.length > num ? num : list.length;
  };

  const settings = {
    dots: true,
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

  return (
    <div className={timesaleStyle.timesale_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>
            <div>타임특가</div>
            <p>지금이 쇼핑찬스! 놓치면 후회하는 특가상품</p>
          </h3>
        </ViewInUp>
        {list.length > 0 && (
          <Slider {...settings}>
            {list.map((val: any, idx: number) => {
              return (
                <div key={idx} className={timesaleStyle.timesale_item}>
                  <div>
                    <div className={timesaleStyle.timer}>
                      <Timer limitDate={val.time_sale} />
                    </div>
                    <div className={timesaleStyle.product_item}>
                      <ProductItem data={val} />
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
}
