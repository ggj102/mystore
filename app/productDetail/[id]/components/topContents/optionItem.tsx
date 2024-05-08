"use client";

import { useState } from "react";
import { priceFormatter } from "@/utils/priceFormatter";

import { ImCross } from "react-icons/im";

export default function OptionItem({
  prdName,
  data,
  updateOption,
  onClickDeleteOption,
  ...props
}: {
  prdName: string;
  data: any;
  updateOption: (id: number, count: number) => void;
  onClickDeleteOption: (id: number) => void;
}) {
  const { option_id, option_name, count } = data;

  const price = priceFormatter(data.price * (count || 1));

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

  const onChangeCount = (e: any) => {
    const numberRegex = /^[0-9]*$/;
    const isValid = numberRegex.test(e.target.value);

    if (!isValid) return;

    setCount(Number(e.target.value));
  };

  const onBlurReset = (e: any) => {
    if (e.target.value !== "0") return;

    setCount(1);
  };

  return (
    <li {...props}>
      <div className="prd_name">
        <p>{prdName}</p>
        <div>{`- ${option_name}`}</div>
      </div>
      <div>
        <div className="count_btn">
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
          <button
            className="remove_btn"
            onClick={() => onClickDeleteOption(option_id)}
          >
            <ImCross />
          </button>
        </div>
      </div>
    </li>
  );
}
