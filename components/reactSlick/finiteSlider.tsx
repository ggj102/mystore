import React from "react";
import Slider from "react-slick";

import finiteSliderStyled from "@styles/components/reactSlider/finiteSlider.module.scss";

export default function FiniteSlider({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // adaptiveHeight: true,
  };

  return (
    <Slider className={finiteSliderStyled.slider} {...settings}>
      {children}
    </Slider>
  );
}
