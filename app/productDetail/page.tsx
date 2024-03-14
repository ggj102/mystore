"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import productDetailStyles from "../../styles/pages/productDetail.module.scss";

import { productDetailFetch } from "@/src/application/useCaseProduct";
import { detailFetch } from "@/src/adaptter/api";
import { ProductType } from "@/src/domain/product";

import { ImCross } from "react-icons/im";
import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import Timer from "@/components/timer";
import { useInView } from "framer-motion";

export default function ProductDetailPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef);

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

  const [optionList, setOptionList] = useState<any>([]);
  const [productData, setproductData] = useState<ProductType>();
  const [currentOption, setCurrentOption] = useState<{
    value: string;
    label: string;
  }>(options[0]);

  const [currentCount, setCurrentCount] = useState<number>(1);

  const [isFixedBarOpen, setIsFixedBarOpen] = useState<boolean>(false);

  const searchParams = useSearchParams().get("id");
  const router = useRouter();

  // const dispatch = useDispatch();

  const onClickIncreaseCurrentCount = () => {
    setCurrentCount(currentCount + 1);
  };

  const onClickDecreaseCurrentCount = () => {
    if (currentCount > 1) setCurrentCount(currentCount - 1);
  };

  const onChangeCurrentCount = (e: any) => {
    const regex = /^[0-9]*$/;

    if (!regex.test(e.target.value)) return;
    else setCurrentCount(Number(e.target.value));
  };

  const onClickAddCart = () => {
    if (currentCount === 0) {
      alert("수량이 부족합니다. (최소 수량: 1개)");
      return;
    }

    // if (productData) {
    //   dispatch(addCartAction({ product: productData, count: currentCount }));
    // }

    const isConfirm = confirm("장바구니 페이지로 이동하시겠습니까?");
    if (isConfirm) router.push("/cart");
  };

  const onChangeOption = (e: any) => {
    const filter = optionList.filter((val: any) => val.id === e.value);

    if (filter.length === 0) {
      const copyArr = [...optionList];
      const filterItem = item.filter((val) => val.id === e.value);

      copyArr.push(filterItem[0]);

      setOptionList(copyArr);
    }
  };

  useEffect(() => {
    if (isInView) setIsFixedBarOpen(false);
  }, [isInView]);

  useEffect(() => {
    if (searchParams) {
      const id = Number(searchParams);
      productDetailFetch(id, detailFetch).then((data) => {
        setproductData(data);
      });
    }
  }, []);

  const test = [1, 2, 3];

  return (
    <div className={productDetailStyles.product_detail_container}>
      <div className="site_wrap">
        <div ref={targetRef} className={productDetailStyles.product_detail_top}>
          <div className={productDetailStyles.product_image}>
            <div>
              <img src="/images/test/testitem2.jpg" alt="prd" />
            </div>
            <ul>
              {test.map((val, idx) => {
                return (
                  <li key={idx}>
                    <img src={`/images/test/testitem${val}.jpg`} alt="prd" />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={productDetailStyles.product_order_info}>
            {/* <div className={productDetailStyles.timer}>
              <Timer limitDate="2024-04-30" />
            </div> */}
            <h1>페이셜 클렌징폼</h1>
            <div className={productDetailStyles.product_description}>
              부담없는 데일리 스크럽 클렌징
            </div>
            <div className={productDetailStyles.product_review}>
              <div>별점</div>
              <strong>3.8</strong>
              <span>(리뷰5개)</span>
            </div>
            <div className={productDetailStyles.price_delivery_info}>
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
            <div className={productDetailStyles.product_option_select}>
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
            <div className={productDetailStyles.cart_order_btn}>
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
        </div>
        <div className={productDetailStyles.product_detail_bottom}></div>
        {!isInView && (
          <div className={productDetailStyles.fixed_bar}>
            <button onClick={() => setIsFixedBarOpen(!isFixedBarOpen)}>
              <IoIosArrowUp
                className={isFixedBarOpen ? "bar_open" : ""}
                size={25}
              />
            </button>
            {isFixedBarOpen && (
              <div className={productDetailStyles.product_option_select}>
                <div className="option_select">
                  <p>옵션</p>
                  <Select
                    isSearchable={false}
                    defaultValue={options[0]}
                    onChange={onChangeOption}
                    maxMenuHeight={100}
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
              </div>
            )}
            <div className="bar_controller">
              <div>
                <p>페이셜 클렌징폼</p>
                <div className="total_price">
                  총 상품금액
                  <strong>43,430원</strong>
                  <span>{`(${optionList.length}개)`}</span>
                </div>
              </div>
              <div className={productDetailStyles.cart_order_btn}>
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
          </div>
        )}
      </div>
    </div>
  );
}
