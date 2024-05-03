"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Slider from "react-slick";
import useObserver from "@/utils/useObserver";
import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Timer from "@/components/timer";

import timesaleStyle from "@styles/pages/home/timesale.module.scss";

export default function Timesale() {
  const [timeSaleData, setTimeSaleData] = useState<any>([]);
  const targetRef = useRef<any>(null);
  const { observeWidth } = useObserver(targetRef);

  const isMedium = observeWidth < 1000;
  const isSmall = observeWidth < 768;
  const isMini = observeWidth < 500;

  const sildesSize = () => {
    let size = 4;
    if (isMedium) {
      size = 3;
    }
    if (isSmall) {
      size = 2;
    }
    if (isMini) {
      size = 1;
    }

    return size;
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: sildesSize(),
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios.get(`http://localhost:3005/timeSaleProduct`).then((res: any) => {
      const slice = res.data.data.slice(0, 8);

      setTimeSaleData(slice);
    });
  }, []);

  return (
    <div ref={targetRef} className={timesaleStyle.timesale_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>
            <div>타임특가</div>
            <p>지금이 쇼핑찬스! 놓치면 후회하는 특가상품</p>
          </h3>
        </ViewInUp>
        {timeSaleData.length > 0 && (
          <Slider className={timesaleStyle.slider} {...settings}>
            {timeSaleData.map((val: any, idx: number) => {
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
