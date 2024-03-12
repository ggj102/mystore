import ViewInUp from "@/components/animation/viewInUp";

import eventBannerStyle from "@styles/pages/home/eventBanner.module.scss";
import Slider from "react-slick";

function NextArrow(props: any) {
  return (
    <div
      className={`${eventBannerStyle.arrow} ${eventBannerStyle.next_arrow}`}
      onClick={props.onClick}
    >
      <div></div>
    </div>
  );
}

function PrevArrow(props: any) {
  return (
    <div
      className={`${eventBannerStyle.arrow} ${eventBannerStyle.pre_arrow}`}
      onClick={props.onClick}
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
    autoplay: false,
    centerPadding: "40%",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const test = [0, 1, 2];

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
        {test.map((val) => {
          return (
            <div key={val} className={eventBannerStyle.slider_item}>
              <img
                width="100%"
                src={`/images/test/eventbanner${val}.jpg`}
                alt="item"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
