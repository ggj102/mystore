import React from "react";
import Slider from "react-slick";

import simpleSliderStyled from "@styles/components/reactSlider/simpleSlider.module.scss";

export default function SimpleSlider({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <Slider className={simpleSliderStyled.slider} {...props}>
      {children}
    </Slider>
  );
}
