"use client";

import { useEffect, useState } from "react";
import { ProductType } from "@/src/domain/product";
import { productListFetch } from "@/src/application/useCaseProduct";
import { listFetch } from "@/src/adaptter/api";

import homeStyles from "../styles/pages/home.module.scss";
import Link from "next/link";
import Image from "next/image";
import CustomImage from "@/components/customImage";
import Slider from "react-slick";
import SimpleSlider from "@/components/reactSlick/simpleSlider";
import FiniteSlider from "@/components/reactSlick/finiteSlider";
import MultipleSlider from "@/components/reactSlick/multipleSlider";
import ViewInUp from "../components/animation/viewInUp";

export default function Home() {
  const [productListData, setProductListData] = useState<ProductType[]>([]);

  const [currentBannerIdx, setCurrentBannerIdx] = useState<number>(0);

  const categoryArr = [
    "타임특가",
    "새로나왔어요",
    "공식몰혜택",
    "첫구매",
    "무료샘플신청",
    "베스트셀러",
    "금액별사은품",
    "고객센터",
  ];

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

  useEffect(() => {
    productListFetch(listFetch).then((list) => {
      setProductListData(list);
    });
  }, []);

  const test = [1, 2, 3];

  const topText = "베스트 어워즈 1위";

  const text = [
    "베스트 어워즈 1위",
    "온 몸을 부드럽게 풀어주는",
    "샌달우드향 신텐시브 샴푸",
  ];

  return (
    <main className={homeStyles.home_container}>
      <div className={homeStyles.main_banner}>
        <div className={homeStyles.simple_slider_container}>
          <SimpleSlider onChangeIdx={setCurrentBannerIdx}>
            {test.map((val, bannerIdx) => {
              return (
                <div key={val} className={homeStyles.main_banner_img}>
                  <img
                    height="550px"
                    src={`/images/test/testbanner${val}.jpg`}
                    alt="img"
                  />
                  <div className={homeStyles.main_banner_text}>
                    {text.map((val, idx) => {
                      const delay = 0.5 + idx * 0.5;

                      return (
                        <div
                          key={idx}
                          className={`${
                            idx === 0
                              ? homeStyles.top_text
                              : homeStyles.bottom_text
                          } ${
                            currentBannerIdx === bannerIdx
                              ? `animate__animated animate__fadeInUp`
                              : homeStyles.invi
                          } `}
                          style={{ animationDelay: `${delay}s` }}
                        >
                          {val}
                        </div>

                        // <ViewInUp key={idx} delay={`${delay}s`} amount="some">
                        //   <div
                        //     className={
                        //       idx === 0
                        //         ? homeStyles.top_text
                        //         : homeStyles.bottom_text
                        //     }
                        //   >
                        //     {val}
                        //   </div>
                        // </ViewInUp>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </SimpleSlider>
        </div>
      </div>
      <div className={homeStyles.icon_category}>
        <ul>
          {categoryArr.map((val, idx) => {
            return (
              <li key={val}>
                <Link href="">
                  <img src={`/images/test/icon${idx + 1}.svg`} />
                </Link>
                <div>{val}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={homeStyles.bests_seller}>
        <ViewInUp once={true}>
          <h3>
            <div>베스트셀러</div>
            <p>마이스토어의 베스트 아이템을 만나보세요!</p>
          </h3>
        </ViewInUp>

        <ul>
          {testBestsellerData.map((val) => {
            return (
              <li className={homeStyles.list_item} key={val.name}>
                <div className={homeStyles.item_img}>
                  <img
                    width="100%"
                    src="/images/test/testitem1.jpg"
                    alt="item"
                  />
                </div>
                <div className={homeStyles.item_info}>
                  <span className={homeStyles.item_name}>{val.name}</span>
                  <span className={homeStyles.item_discription}>
                    {val.discription}
                  </span>
                  <span
                    className={homeStyles.item_price}
                  >{`${val.price}원`}</span>
                  <div>
                    <span
                      className={homeStyles.item_sale}
                    >{`${val.sale}%`}</span>
                    <span className={homeStyles.item_saleprice}>
                      {`${val.saleprice}원`}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={homeStyles.time_sale}>
        <div className={homeStyles.site_wrap}>
          <ViewInUp once={true}>
            <h3>
              <div>타임특가</div>
              <p>지금이 쇼핑찬스! 놓치면 후회하는 특가상품</p>
            </h3>
          </ViewInUp>
          <div className={homeStyles.finite_slider_container}>
            <FiniteSlider>
              {testBestsellerData.map((val, idx, arr) => {
                const isLast = idx + 1 === arr.length;

                return (
                  <div key={val.name}>
                    <div
                      className={`${homeStyles.list_item} ${
                        isLast ? `${homeStyles.last_item}` : ""
                      }`}
                    >
                      <div className={homeStyles.item_img}>
                        <img
                          width="100%"
                          src="/images/test/testitem1.jpg"
                          alt="item"
                        />
                      </div>
                      <div className={homeStyles.item_info}>
                        <span className={homeStyles.item_name}>{val.name}</span>
                        <span className={homeStyles.item_discription}>
                          {val.discription}
                        </span>
                        <span
                          className={homeStyles.item_price}
                        >{`${val.price}원`}</span>
                        <div>
                          <span
                            className={homeStyles.item_sale}
                          >{`${val.sale}%`}</span>
                          <span className={homeStyles.item_saleprice}>
                            {`${val.saleprice}원`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </FiniteSlider>
          </div>
        </div>
      </div>
      <div className={homeStyles.event}>
        <div className={homeStyles.site_wrap}>
          <ViewInUp once={true}>
            <h3>
              <div>이벤트</div>
              <p>진행중인 이벤트를 놓치지 마세요</p>
            </h3>
          </ViewInUp>
        </div>
        <div className={homeStyles.multiple_slider_container}>
          <MultipleSlider>
            {test.map((val) => {
              return (
                <div key={val}>
                  <img
                    width="100%"
                    src={`/images/test/eventbanner${val}.jpg`}
                    alt="item"
                  />
                </div>
              );
            })}
          </MultipleSlider>
        </div>
      </div>
      <div className={homeStyles.prd_ad}>
        <div className={homeStyles.site_wrap}>
          <ViewInUp once={true}>
            <h3>
              <div>함께 나누고 싶은 특별함</div>
              <p>영상 속 화제의 제품을 소개합니다</p>
            </h3>
          </ViewInUp>
          <div className={homeStyles.video_item}>
            <div className={homeStyles.video}>
              <video controls width="100%">
                <source src="/image/test/video1.mp4" type="video/mp4" />
              </video>
            </div>
            <ul className={homeStyles.item}>
              {testBestsellerData.map((val) => {
                return (
                  <li className={homeStyles.list_item} key={val.name}>
                    <div className={homeStyles.item_img}>
                      <CustomImage
                        width="100%"
                        // height="auto"
                        src="/images/test/testitem1.jpg"
                        alt="item"
                      />
                    </div>
                    <div className={homeStyles.item_info}>
                      <span className={homeStyles.item_name}>{val.name}</span>
                      <span className={homeStyles.item_discription}>
                        {val.discription}
                      </span>
                      <span
                        className={homeStyles.item_price}
                      >{`${val.price}원`}</span>
                      <div>
                        <span
                          className={homeStyles.item_sale}
                        >{`${val.sale}%`}</span>
                        <span className={homeStyles.item_saleprice}>
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
      <div className={homeStyles.bests_seller}>
        <ViewInUp once={true}>
          <h3>
            <div>신제품</div>
            <p>누구보다 빠르게 주목해야 할 신상</p>
          </h3>
        </ViewInUp>
        <ul>
          {testBestsellerData.map((val) => {
            return (
              <li className={homeStyles.list_item} key={val.name}>
                <div className={homeStyles.item_img}>
                  <img
                    width="100%"
                    // height="auto"
                    src="/images/test/testitem1.jpg"
                    alt="item"
                  />
                </div>
                <div className={homeStyles.item_info}>
                  <span className={homeStyles.item_name}>{val.name}</span>
                  <span className={homeStyles.item_discription}>
                    {val.discription}
                  </span>
                  <span
                    className={homeStyles.item_price}
                  >{`${val.price}원`}</span>
                  <div>
                    <span
                      className={homeStyles.item_sale}
                    >{`${val.sale}%`}</span>
                    <span className={homeStyles.item_saleprice}>
                      {`${val.saleprice}원`}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/* <div className={homeStyles.review}>
        <div className={homeStyles.site_wrap}>
          <h3>
            <div>리뷰</div>
            <p>고객님들이 직접 작성한 리뷰를 확인해보세요</p>
          </h3>
          <ul>
            {testBestsellerData.map((val) => {
              return (
                <li className={homeStyles.list_item} key={val.name}>
                  <div className={homeStyles.item_img}>
                    <CustomImage
                      width="100%"
                      // height="auto"
                      src="/images/test/testitem1.jpg"
                      alt="item"
                    />
                  </div>
                  <div className={homeStyles.item_info}>
                    <span className={homeStyles.item_name}>{val.name}</span>
                    <span className={homeStyles.item_discription}>
                      {val.discription}
                    </span>
                    <span
                      className={homeStyles.item_price}
                    >{`${val.price}원`}</span>
                    <div>
                      <span
                        className={homeStyles.item_sale}
                      >{`${val.sale}%`}</span>
                      <span className={homeStyles.item_saleprice}>
                        {`${val.saleprice}원`}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div> */}
    </main>
  );
}