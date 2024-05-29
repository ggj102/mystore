"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useInView } from "framer-motion";
import Select from "react-select";
import clsx from "clsx";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { priceFormatter } from "@/utils/priceFormatter";
import { createOrderAction } from "@/app/cart/components/cartActions";
import { addCartAction } from "../productDetailActions";

import Timer from "@/components/timer";
import OptionItem from "./optionItem";
import FixedBar from "./fixedBar";

import { BsCart2 } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import topContentsStyles from "@styles/pages/productDetail/topContents.module.scss";

export default function TopContents({ data }: { data: any }) {
  // const { product_detail } = data;

  const router = useRouter();

  const targetRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(targetRef || null);

  const [currentImage, setCurrentImage] = useState<string>("");
  const [isFixedBarOpen, setIsFixedBarOpen] = useState<boolean>(false);

  const [currentOption, setCurrentOption] = useState<any>({
    value: 0,
    label: "-[선택] 옵션을 선택해 주세요-",
  });

  const [options, setOptions] = useState<any>([]);
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

    const { product_option } = data;

    const findOption = product_option.find((val: any) => val.option_id === id);

    if (findOption) {
      const copyArr = [...selectedOptions];

      copyArr.push({
        item_id: data.id,
        option_id: findOption.option_id,
        name: data.name,
        option_name: findOption.name,
        option_price: findOption.option_price,
        price: data.price,
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

  const onClickCreateOrder = async () => {
    if (selectedOptions.length === 0) alert("옵션을 선택해 주세요.");
    else {
      const id = data.id;

      const order_item = selectedOptions.map((val: any) => {
        return {
          id,
          product_option: { option_id: val.option_id },
          cart_info: { count: val.count },
        };
      });

      const postData = selectedOptions.map((val: any) => {
        const { item_id, option_id, count } = val;

        return { item_id, option_id, count };
      });

      try {
        await addCartAction(postData);
        const res = await createOrderAction(order_item);

        router.push(`/order?order_id=${res.order_id}`);
      } catch (err) {
        tokenExpiredErrorMessage(err);
      }
    }
  };

  const onClickAddCart = async () => {
    if (selectedOptions.length === 0) alert("옵션을 선택해 주세요.");
    else {
      const postData = selectedOptions.map((val: any) => {
        const { item_id, option_id, count } = val;

        return { item_id, option_id, count };
      });

      try {
        await addCartAction(postData);

        const isConfirm = confirm(
          "장바구니에 담았습니다.\n장바구니 페이지로 이동하시겠습니까?"
        );
        if (isConfirm) router.push("/cart");
      } catch (err) {
        tokenExpiredErrorMessage(err);
      }
    }
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
    if (data.product_detail) {
      const { product_detail, product_option } = data;
      const { image_path, sub_image_path } = product_detail;

      const isSubImage = sub_image_path.length > 1;
      const image = isSubImage ? sub_image_path[0] : image_path;

      getOptions(product_option);
      setCurrentImage(image);
    }
  }, [data]);

  useEffect(() => setTotal(), [selectedOptions]);

  useEffect(() => {
    if (isInView) setIsFixedBarOpen(false);
  }, [isInView]);

  return (
    <div ref={targetRef} className={topContentsStyles.top_contents_container}>
      <div className={topContentsStyles.product_image}>
        <div>
          <img src={currentImage} alt="prd" />
        </div>
        <ul>
          {data.product_detail?.sub_image_path.map(
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
          {data.time_sale && <Timer limitDate={data.time_sale} />}
        </div>
        <div className={topContentsStyles.product_title}>
          <h1>{data.name}</h1>
          <div className={topContentsStyles.product_description}>
            {data.description}
          </div>
          <div className={topContentsStyles.product_review}>
            <div>별점</div>
            <strong>{data.popularity}</strong>
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
            <p>{data.defaultPrice}원</p>
            <div className="price">
              <span>{data.price}원</span>
              <span>{data.discount}%</span>
            </div>
            <div>{data.product_detail?.domestic}</div>
            <div>{data.product_detail?.delivery_type}</div>
            <div>{data.product_detail?.delivery_price}</div>
          </div>
        </div>
        <div className={topContentsStyles.product_option_select}>
          <div className="option_select">
            <p>옵션</p>
            <Select
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
                  prdName={data.name}
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
          <button onClick={onClickAddCart}>
            <BsCart2 size={22} />
            장바구니
          </button>
          <button onClick={onClickCreateOrder}>
            <FaCheck />
            바로 구매
          </button>
        </div>
      </div>
      {!isInView && targetRef.current && (
        <FixedBar
          isFixedBarOpen={isFixedBarOpen}
          prdName={data.name}
          options={options}
          selectedOptions={selectedOptions}
          currentOption={currentOption}
          totalPrice={totalPrice}
          totalCount={totalCount}
          setIsFixedBarOpen={setIsFixedBarOpen}
          updateOption={updateOption}
          onClickDeleteOption={onClickDeleteOption}
          onChangeOption={onChangeOption}
          onClickAddCart={onClickAddCart}
          onClickCreateOrder={onClickCreateOrder}
        />
      )}
    </div>
  );
}
