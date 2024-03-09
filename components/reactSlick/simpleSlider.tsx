import React from "react";
import Slider from "react-slick";

import simpleSliderStyled from "@styles/components/reactSlider/simpleSlider.module.scss";

export default function SimpleSlider({
  children,
  onChangeIdx,
  ...props
}: {
  children: React.ReactNode;
  onChangeIdx?: (idx: number) => void;
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: (idx: any) => {
      if (onChangeIdx) onChangeIdx(idx);
    },
  };

  return (
    <Slider className={simpleSliderStyled.slider} {...settings} {...props}>
      {children}
    </Slider>
  );
}
