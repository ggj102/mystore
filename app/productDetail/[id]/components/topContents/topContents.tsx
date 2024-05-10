"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useInView } from "framer-motion";
import { useAppSelector } from "@/src/adaptter/redux/hooks";
import { priceFormatter } from "@/utils/priceFormatter";

import Timer from "@/components/timer";
import OptionItem from "./optionItem";
import CustomSelect from "@/components/customSelect";
// import FixedBar from "./fixedBar";

import clsx from "clsx";

import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

import topContentsStyles from "@styles/pages/productDetail/topContents.module.scss";
import axios from "axios";

export default function TopContents({
  productDetailData,
}: {
  productDetailData: any;
}) {
  // const { product_detail } = productDetailData;

  const userData = useAppSelector((state) => state.user.user);
  const router = useRouter();

  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef || null);

  const [currentImage, setCurrentImage] = useState<string>("");
  const [isFixedBarOpen, setIsFixedBarOpen] = useState<boolean>(false);

  const [currentOption, setCurrentOption] = useState<any>({
    value: 0,
    label: "-[선택] 옵션을 선택해 주세요-",
  });

  // options - optionData를 가공해 selectbox에 넣는 데이터
  const [options, setOptions] = useState<any>([]);
  // selectedOptions - selectbox에서 선택 된 option들
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const getOptions = (optionData: any) => {
    // optionData = option DB 데이터
    const optionMap = optionData.map((val: any) => {
      const { option_id, name, option_price } = val;

      return { value: option_id, label: `${name} (+${option_price}원)` };
    });

    const first = { value: 0, label: "-[선택] 옵션을 선택해 주세요-" };
    optionMap.unshift(first);

    setOptions(optionMap);
  };

  const onChangeOption = (e: any) => {
    const id = Number(e.value);

    const selectedCheck = selectedOptions.find(
      (val: any) => val.option_id === id
    );

    if (selectedCheck) {
      alert("이미 선택한 옵션 입니다.");
      return;
    }

    const { product_option } = productDetailData;

    const findOption = product_option.find((val: any) => val.option_id === id);

    if (findOption) {
      const copyArr = [...selectedOptions];

      copyArr.push({
        user_id: userData.id,
        item_id: productDetailData.id,
        option_id: findOption.option_id,
        name: productDetailData.name,
        option_name: findOption.name,
        option_price: findOption.option_price,
        price: productDetailData.price,
        count: 1,
      });

      setSelectedOptions(copyArr);
      setCurrentOption(options[0]);
    }
  };

  const updateOption = (id: number, count: number) => {
    const copy: any = [...selectedOptions];
    const findIndex = copy.findIndex((val: any) => val.option_id === id);

    copy[findIndex] = { ...copy[findIndex], count };

    setSelectedOptions(copy);
  };

  const onClickDeleteOption = (id: number) => {
    const copy: any = [...selectedOptions];
    const removeFilter = copy.filter((val: any) => val.option_id !== id);

    setSelectedOptions(removeFilter);
  };

  const onClickCart = () => {
    if (selectedOptions.length === 0) alert("상품을 선택해 주세요.");

    const postData = selectedOptions.map((val: any) => {
      const { user_id, item_id, option_id, count } = val;

      return { user_id, item_id, option_id, count };
    });

    axios.post("http://localhost:3005/cart", postData).then(() => {
      const isConfirm = confirm(
        "장바구니에 담았습니다.\n장바구니 페이지로 이동하시겠습니까?"
      );
      if (isConfirm) router.push("/cart");
    });
  };

  const setTotal = () => {
    const priceReduce = selectedOptions.reduce(
      (acc: any, val: any) => {
        const price = val.count * (val.price + val.option_price);

        return {
          ...acc,
          price: acc.price + price,
          count: acc.count + val.count,
        };
      },
      { price: 0, count: 0 }
    );
    const { price, count } = priceReduce;

    setTotalPrice(price);
    setTotalCount(count);
  };

  useEffect(() => {
    if (productDetailData.product_detail) {
      const { product_detail, product_option } = productDetailData;
      const { image_path, sub_image_path } = product_detail;

      const isSubImage = sub_image_path.length > 1;
      const image = isSubImage ? sub_image_path[0] : image_path;

      getOptions(product_option);
      setCurrentImage(image);
    }
  }, [productDetailData]);

  useEffect(() => setTotal(), [selectedOptions]);

  useEffect(() => {
    if (isInView) setIsFixedBarOpen(false);
  }, [userData]);

  return (
    <div ref={targetRef} className={topContentsStyles.top_contents_container}>
      <div className={topContentsStyles.product_image}>
        <div>
          <img src={currentImage} alt="prd" />
        </div>
        <ul>
          {productDetailData.product_detail?.sub_image_path.map(
            (val: string, idx: number) => {
              return (
                <li key={idx} onClick={() => setCurrentImage(val)}>
                  <img
                    className={clsx({ is_current: currentImage === val })}
                    src={val}
                    alt="prd"
                  />
                </li>
              );
            }
          )}
        </ul>
      </div>
      <div className={topContentsStyles.product_order_info}>
        <div className={topContentsStyles.timer}>
          {productDetailData.time_sale && (
            <Timer limitDate={productDetailData.time_sale} />
          )}
        </div>
        <div className={topContentsStyles.product_title}>
          <h1>{productDetailData.name}</h1>
          <div className={topContentsStyles.product_description}>
            {productDetailData.description}
          </div>
          <div className={topContentsStyles.product_review}>
            <div>별점</div>
            <strong>{productDetailData.popularity}</strong>
            {/* <span>(리뷰5개)</span> */}
          </div>
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
            <p>{productDetailData.defaultPrice}원</p>
            <div className="price">
              <span>{productDetailData.price}원</span>
              <span>{productDetailData.discount}%</span>
            </div>
            <div>{productDetailData.product_detail?.domestic}</div>
            <div>{productDetailData.product_detail?.delivery_type}</div>
            <div>{productDetailData.product_detail?.delivery_price}</div>
          </div>
        </div>
        <div className={topContentsStyles.product_option_select}>
          <div className="option_select">
            <p>옵션</p>
            <CustomSelect
              isSearchable={false}
              value={currentOption}
              onChange={onChangeOption}
              options={options}
            />
          </div>
          <ul>
            {selectedOptions.map((val: any) => {
              return (
                <OptionItem
                  key={val.option_id}
                  prdName={productDetailData.name}
                  data={val}
                  updateOption={updateOption}
                  onClickDeleteOption={onClickDeleteOption}
                />
              );
            })}
          </ul>
          <div className="total_price">
            총 상품금액
            <strong>{priceFormatter(totalPrice)}원</strong>
            <span>{`(${totalCount}개)`}</span>
          </div>
        </div>
        <div className={topContentsStyles.cart_order_btn}>
          <button onClick={onClickCart}>
            <BsCart2 size={22} />
            장바구니
          </button>
          <button>
            <FaCheck />
            바로 구매
          </button>
        </div>
      </div>
      {/* {!isInView && targetRef.current && (
        <FixedBar
          isFixedBarOpen={isFixedBarOpen}
          options={options}
          optionList={optionList}
          onChangeOption={onChangeOption}
          setIsFixedBarOpen={setIsFixedBarOpen}
        />
      )} */}
    </div>
  );
}
