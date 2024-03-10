import { useState } from "react";

import SimpleSlider from "@/components/reactSlick/simpleSlider";
import mainBannerStyle from "@styles/pages/home/mainBanner.module.scss";

function SampleNextArrow(props: any) {
  return (
    <div
      className={`${mainBannerStyle.arrow} ${mainBannerStyle.next_arrow}`}
      onClick={props.onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  return (
    <div
      className={`${mainBannerStyle.arrow} ${mainBannerStyle.pre_arrow}`}
      onClick={props.onClick}
    />
  );
}

export default function MainBanner({}) {
  const [currentBannerIdx, setCurrentBannerIdx] = useState<number>(0);
  const test = [1, 2, 3];

  const text = [
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
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    afterChange: (idx: any) => {
      if (setCurrentBannerIdx) setCurrentBannerIdx(idx);
    },
  };

  return (
    <div className={mainBannerStyle.main_banner_container}>
      <SimpleSlider {...settings}>
        {test.map((val, bannerIdx) => {
          return (
            <div key={val} className={mainBannerStyle.main_banner_img}>
              <img
                height="550px"
                src={`/images/test/testbanner${val}.jpg`}
                alt="img"
              />
              <div className={mainBannerStyle.main_banner_text}>
                {text.map((val, idx) => {
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
            </div>
          );
        })}
      </SimpleSlider>
      <div className={mainBannerStyle.slider_page}>
        <span>{currentBannerIdx + 1}</span>/<span>{test.length}</span>
      </div>
    </div>
  );
}
