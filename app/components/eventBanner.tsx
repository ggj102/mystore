"use client";

import Link from "next/link";

import Slider from "react-slick";
import ViewInUp from "@/components/animation/viewInUp";

import eventBannerStyle from "@styles/pages/home/eventBanner.module.scss";

function NextArrow({ onClick }: ArrowProps) {
  return (
    <div
      className={`${eventBannerStyle.arrow} ${eventBannerStyle.next_arrow}`}
      onClick={onClick}
    >
      <div></div>
    </div>
  );
}

function PrevArrow({ onClick }: ArrowProps) {
  return (
    <div
      className={`${eventBannerStyle.arrow} ${eventBannerStyle.pre_arrow}`}
      onClick={onClick}
    >
      <div></div>
    </div>
  );
}

export default function EventBanner() {
  const settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    centerPadding: "40%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const dummy = [0, 1, 2];

  return (
    <div className={eventBannerStyle.event_banner_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>
            <div>이벤트</div>
            <p>진행중인 이벤트를 놓치지 마세요</p>
          </h3>
        </ViewInUp>
      </div>
      <Slider className={eventBannerStyle.slider} {...settings}>
        {dummy.map((val, idx) => {
          return (
            <Link
              href={`/productDetail/9${idx}`}
              key={val}
              className={eventBannerStyle.slider_item}
            >
              <img
                width="100%"
                src={`/images/test/eventbanner${val}.jpg`}
                alt="item"
              />
            </Link>
          );
        })}
      </Slider>
    </div>
  );
}
