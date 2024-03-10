import React from "react";
import Slider from "react-slick";

import multipleSliderStyled from "@styles/components/reactSlider/multipleSlider.module.scss";

export default function MultipleSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Slider className={multipleSliderStyled.slider} {...settings}>
      {children}
    </Slider>
  );
}
