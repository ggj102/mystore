"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";

import { priceFormatter } from "@/utils/priceFormatter";
import ListCheckBox from "./listCheckBox";

import { ImCross } from "react-icons/im";
import cartStyles from "@styles/pages/cart.module.scss";

interface CartItemProps {
  index: number;
  data: CartItemType;
  onClickUpdateCount: (
    index: number,
    count: number,
    info: CartInfoType
  ) => void;
  onClickProductOrder: (index: number) => void;
  onChangeChecked: (index: number) => void;
  onClickItemRemove: (index: number) => void;
}

export default function CartItem({
  index,
  data,
  onClickUpdateCount,
  onClickProductOrder,
  onChangeChecked,
  onClickItemRemove,
  ...props
}: CartItemProps) {
  const { name, image_path, isChecked } = data;
  const { option_price } = data.product_option;
  const { delivery_price, delivery_type } = data.product_detail;

  const count = data.cart_info.count;
  const calc = (data.price + option_price) * count;
  const price = priceFormatter(calc);

  const [currentCount, setCurrentCount] = useState<number>(count);

  const onClickDecrease = () => {
    if (currentCount === 1) return;

    setCurrentCount(currentCount - 1);
  };

  const onClickIncrease = () => {
    setCurrentCount(currentCount + 1);
  };

  const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const numberRegex = /^[0-9]*$/;
    const isValid = numberRegex.test(e.target.value);

    if (!isValid) return;

    setCurrentCount(Number(e.target.value));
  };

  useEffect(() => setCurrentCount(count), [count]);

  return (
    <li {...props}>
      <div className={cartStyles.list_item_info}>
        <ListCheckBox
          id={index}
          isChecked={isChecked}
          onChangeChecked={() => onChangeChecked(index)}
        />
        <Link href={`/productDetail/${data.id}`}>
          <img src={image_path} />
        </Link>
        <div>
          <div>
            <Link href={`/productDetail/${data.id}`}>{name}</Link>
            <div>{price}원</div>
            <div className="delivery_info">
              {`배송 : [${delivery_price}] / ${delivery_type}`}
            </div>
            <div className="item_option">{`[옵션: ${data.product_option.name}]`}</div>
          </div>
          <strong>{price}원</strong>
        </div>
        <button onClick={() => onClickItemRemove(index)} title="삭제">
          <ImCross />
        </button>
      </div>
      <div className={cartStyles.item_order_btn}>
        <div className="count_btn">
          <button onClick={onClickDecrease}>-</button>
          <input value={currentCount} onChange={onChangeCount} />
          <button onClick={onClickIncrease}>+</button>
          {count !== currentCount && (
            <button
              className={cartStyles.update_count_btn}
              onClick={() =>
                onClickUpdateCount(index, currentCount, data.cart_info)
              }
            >
              수량변경
            </button>
          )}
        </div>
        <div className="order_btn">
          {/* <button>관심상품</button> */}
          <button onClick={() => onClickProductOrder(index)}>주문하기</button>
        </div>
      </div>
    </li>
  );
}
