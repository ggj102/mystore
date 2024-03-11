import Slider from "react-slick";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import Timer from "@/components/timer";

import timesaleStyle from "@styles/pages/home/timesale.module.scss";

export default function Timesale() {
  const testBestsellerData = [
    {
      name: "스킨 하이드로 트리트먼트",
      discription: "즉각 수분진정 효과로 쉽고 간편하게 피부 스트레스를 케어",
      saleprice: 209000,
      sale: 28,
      price: 290000,
    },
    {
      name: "에센스 UV 프로텍터",
      discription: "보습부터 자외선 차단까지 순한 데일리 선크림",
      saleprice: 49500,
      sale: 5,
      price: 52000,
    },
    {
      name: "타투 퍼퓸 패키지",
      discription: "향기와 함께 마음을 전해보세요",
      saleprice: 44000,
      sale: 25,
      price: 59000,
    },
    {
      name: "우드 헤어 브러쉬",
      discription: "트리트먼트와 같이 쓰면 더욱 좋은 우드 브러쉬",
      saleprice: 29000,
      sale: 28,
      price: 20900,
    },
  ];

  const concatArr = testBestsellerData.concat(testBestsellerData);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        <Slider className={timesaleStyle.slider} {...settings}>
          {concatArr.map((val, idx) => {
            return (
              <div key={idx} className={timesaleStyle.timesale_item}>
                <div>
                  <div className={timesaleStyle.timer}>
                    <Timer limitDate="2024-04-30" />
                  </div>
                  <div className={timesaleStyle.product_item}>
                    <ProductItem data={val} />
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}
