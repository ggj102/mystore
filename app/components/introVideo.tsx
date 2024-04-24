"use client";

import ViewInUp from "@/components/animation/viewInUp";

import introVideoStyle from "@styles/pages/home/introVideo.module.scss";

export default function IntroVideo() {
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

  return (
    <div className={introVideoStyle.intro_video_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>
            <div>함께 나누고 싶은 특별함</div>
            <p>영상 속 화제의 제품을 소개합니다</p>
          </h3>
        </ViewInUp>
        <div className={introVideoStyle.video_item}>
          <div className={introVideoStyle.video}>
            <video src="/images/test/video1.mp4" autoPlay></video>
          </div>
          <ul>
            {concatArr.map((val, idx) => {
              return (
                <li key={idx}>
                  <div className={introVideoStyle.item_img}>
                    <img src="/images/test/testitem1.jpg" alt="item" />
                  </div>
                  <div className={introVideoStyle.item_info}>
                    <span className={introVideoStyle.item_name}>
                      {val.name}
                    </span>
                    <span className={introVideoStyle.item_discription}>
                      {val.discription}
                    </span>
                    <span
                      className={introVideoStyle.item_price}
                    >{`${val.price}원`}</span>
                    <div>
                      <span
                        className={introVideoStyle.item_sale}
                      >{`${val.sale}%`}</span>
                      <span className={introVideoStyle.item_saleprice}>
                        {`${val.saleprice}원`}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
