"use client";

import { useState } from "react";
import Link from "next/link";
import Slider from "react-slick";

import mainBannerStyle from "@styles/pages/home/mainBanner.module.scss";

function NextArrow({ onClick }: ArrowProps) {
  return (
    <div
      className={`${mainBannerStyle.arrow} ${mainBannerStyle.next_arrow}`}
      onClick={onClick}
    />
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <div
      className={`${mainBannerStyle.arrow} ${mainBannerStyle.pre_arrow}`}
      onClick={onClick}
    />
  );
}

export default function MainBanner({}) {
  const [currentBannerIdx, setCurrentBannerIdx] = useState<number>(0);
  const test = [1, 2, 3];

  const dummy = [
    "베스트 어워즈 1위",
    "온 몸을 부드럽게 풀어주는",
    "샌달우드향 신텐시브 샴푸",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (idx: number) => {
      if (setCurrentBannerIdx) setCurrentBannerIdx(idx);
    },
  };

  return (
    <div className={mainBannerStyle.main_banner_container}>
      <Slider {...settings}>
        {test.map((val, bannerIdx) => {
          return (
            <Link
              href={`/productDetail/10${bannerIdx}`}
              key={val}
              className={mainBannerStyle.main_banner_item}
            >
              <img src={`/images/test/testbanner${val}.jpg`} alt="img" />
              <div className={mainBannerStyle.main_banner_text}>
                {dummy.map((val, idx) => {
                  const delay = 0.5 + idx * 0.5;

                  return (
                    <div
                      key={idx}
                      className={`${
                        idx === 0
                          ? mainBannerStyle.top_text
                          : mainBannerStyle.bottom_text
                      } ${
                        currentBannerIdx === bannerIdx
                          ? `animate__animated animate__fadeInUp`
                          : mainBannerStyle.invi
                      } `}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {val}
                    </div>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </Slider>
      <div className={mainBannerStyle.slider_page}>
        <span>{currentBannerIdx + 1}</span>/<span>{test.length}</span>
      </div>
    </div>
  );
}
