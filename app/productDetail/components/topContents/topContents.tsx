import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { ImCross } from "react-icons/im";
import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

import topContentsStyles from "@styles/pages/productDetail/topContents.module.scss";

import { useInView } from "framer-motion";
import FixedBar from "./fixedBar";
import Timer from "@/components/timer";
import clsx from "clsx";

export default function TopContents() {
  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef || null);

  const [currentImage, setCurrentImage] = useState<number>(1);

  const [optionList, setOptionList] = useState<any>([]);
  const [isFixedBarOpen, setIsFixedBarOpen] = useState<boolean>(false);

  const options = [
    { value: "0", label: "-[선택] 옵션을 선택해 주세요-" },
    { value: "1", label: "optionA" },
    { value: "2", label: "optionB" },
    { value: "3", label: "optionC" },
    { value: "4", label: "optionD" },
    { value: "5", label: "optionE" },
    { value: "6", label: "optionF" },
  ];

  const item = [
    {
      id: "1",
      option: "optionA",
      price: 3000,
      count: 1,
    },
    {
      id: "2",
      option: "optionB",
      price: 4000,
      count: 1,
    },
    {
      id: "3",
      option: "optionC",
      price: 5000,
      count: 1,
    },
    {
      id: "4",
      option: "optionD",
      price: 7000,
      count: 1,
    },
    {
      id: "5",
      option: "optionE",
      price: 1000,
      count: 1,
    },
    {
      id: "6",
      option: "optionF",
      price: 2222,
      count: 1,
    },
  ];

  const test = [1, 2, 3, 1, 2, 3];

  const onChangeOption = (e: any) => {
    if (e.value === "0") return;
    const filter = optionList.filter((val: any) => val.id === e.value);

    if (filter.length === 0) {
      const copyArr = [...optionList];
      const filterItem = item.filter((val) => val.id === e.value);

      copyArr.push(filterItem[0]);

      setOptionList(copyArr);
    }
  };

  useEffect(() => {
    console.log(targetRef.current?.offsetHeight, "인뷰");
    if (isInView) setIsFixedBarOpen(false);
  }, [isInView]);

  return (
    <div ref={targetRef} className={topContentsStyles.top_contents_container}>
      <div className={topContentsStyles.product_image}>
        <div>
          <img src={`/images/test/testitem${currentImage}.jpg`} alt="prd" />
        </div>
        <ul>
          {test.map((val, idx) => {
            return (
              <li key={idx} onClick={() => setCurrentImage(val)}>
                <img
                  className={clsx({ is_current: currentImage === val })}
                  src={`/images/test/testitem${val}.jpg`}
                  alt="prd"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={topContentsStyles.product_order_info}>
        <div className={topContentsStyles.timer}>
          <Timer limitDate="2024-04-30" />
        </div>
        <div className={topContentsStyles.product_title}>
          <h1>페이셜 클렌징폼</h1>
          <div className={topContentsStyles.product_description}>
            부담없는 데일리 스크럽 클렌징
          </div>
          {/* <div className={topContentsStyles.product_review}>
          <div>별점</div>
          <strong>3.8</strong>
          <span>(리뷰5개)</span>
        </div> */}
        </div>
        <div className={topContentsStyles.price_delivery_info}>
          <div>
            <div>소비자가</div>
            <div className="price">판매가</div>
            <div>국내·해외배송</div>
            <div>배송방법</div>
            <div>배송비</div>
          </div>
          <div>
            <p>15,000원</p>
            <div className="price">
              <span>12,000원</span>
              <span>20%</span>
            </div>
            <div>국내배송</div>
            <div>택배</div>
            <div>2,500원 (50,000원 이상 구매 시 무료)</div>
          </div>
        </div>
        <div className={topContentsStyles.product_option_select}>
          <div className="option_select">
            <p>옵션</p>
            <Select
              isSearchable={false}
              defaultValue={options[0]}
              onChange={onChangeOption}
              // value={currentOption}
              options={options}
            />
          </div>
          <ul>
            {optionList.map((val: any) => {
              const { id, option, price, count } = val;

              return (
                <li key={id}>
                  <div className="prd_name">
                    <p>페이셜 클렌징폼</p>
                    <div>{`- ${option}`}</div>
                  </div>
                  <div>
                    <div className="count_btn">
                      <button>-</button>
                      <input defaultValue={count} />
                      <button>+</button>
                    </div>
                    <div>
                      <span>{`${price}원`}</span>
                      <button className="remove_btn">
                        <ImCross />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="total_price">
            총 상품금액
            <strong>43,430원</strong>
            <span>{`(${optionList.length}개)`}</span>
          </div>
        </div>
        <div className={topContentsStyles.cart_order_btn}>
          <button>
            <BsCart2 size={22} />
            장바구니
          </button>
          <button>
            <FaCheck />
            바로 구매
          </button>
        </div>
      </div>
      {!isInView && targetRef.current && (
        <FixedBar
          isFixedBarOpen={isFixedBarOpen}
          options={options}
          optionList={optionList}
          onChangeOption={onChangeOption}
          setIsFixedBarOpen={setIsFixedBarOpen}
        />
      )}
    </div>
  );
}
