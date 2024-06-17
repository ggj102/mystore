"use client";

import { ChangeEvent, useState } from "react";
import { priceFormatter } from "@/utils/priceFormatter";
import { SelectedOptionsType } from "./topContents";

import { ImCross } from "react-icons/im";
import optionItemStyle from "@styles/pages/productDetail/optionItem.module.scss";

export default function OptionItem({
  prdName,
  data,
  updateOption,
  onClickDeleteOption,
  ...props
}: {
  prdName: string;
  data: SelectedOptionsType;
  updateOption: (id: number, count: number) => void;
  onClickDeleteOption: (id: number) => void;
}) {
  const { option_id, option_name, option_price, count } = data;

  const price = priceFormatter((data.price + option_price) * count);

  const [currentCount, setCurrentCount] = useState<number>(count);

  const setCount = (count: number) => {
    updateOption(option_id, count);
    setCurrentCount(count);
  };

  const onClickDecrease = () => {
    if (currentCount === 1) return;

    setCount(currentCount - 1);
  };

  const onClickIncrease = () => {
    setCount(currentCount + 1);
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const numberRegex = /^[0-9]*$/;
    const isValid = numberRegex.test(e.target.value);

    if (!isValid) return;

    setCurrentCount(Number(e.target.value));
  };

  const onBlurReset = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "0") {
      setCount(Number(e.target.value));
    } else setCount(1);
  };

  return (
    <li className={optionItemStyle.option_item_container} {...props}>
      <div className={optionItemStyle.prd_name}>
        <p>{prdName}</p>
        <div>{`- ${option_name}`}</div>
      </div>
      <button
        title="삭제"
        className={optionItemStyle.remove_btn}
        onClick={() => onClickDeleteOption(option_id)}
      >
        <ImCross />
      </button>
      <div className={optionItemStyle.count_price}>
        <div className={optionItemStyle.count_btn}>
          <button onClick={onClickDecrease}>-</button>
          <input
            value={currentCount}
            onChange={onChangeCount}
            onBlur={onBlurReset}
          />
          <button onClick={onClickIncrease}>+</button>
        </div>
        <div>
          <span>{`${price}원`}</span>
        </div>
      </div>
    </li>
  );
}
