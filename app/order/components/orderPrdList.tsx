"use client";

import Link from "next/link";

import { priceFormatter } from "@/utils/priceFormatter";

import FoldContainer from "./foldContainer";

// import { ImCross } from "react-icons/im";
import orderPrdListStyle from "@styles/pages/order/orderPrdList.module.scss";

export default function OrderPrdList({
  orderItem,
  deliveryPrice,
}: // onClickItemRemove,
{
  orderItem: any;
  deliveryPrice: number;
  // onClickItemRemove: any;
}) {
  const totalPrdCount = orderItem.reduce((acc: number, val: any) => {
    const count = val.cart_info.count;
    return acc + count;
  }, 0);

  return (
    <FoldContainer title="주문상품">
      <div className={orderPrdListStyle.order_prd_list_container}>
        <div>
          총 수량: <strong>{totalPrdCount}</strong>개
        </div>
        <ul>
          {orderItem.map((val: any, idx: number) => {
            const { name, image_path } = val;
            const { option_price } = val.product_option;

            const count = val.cart_info.count;
            const calc = (val.price + option_price) * count;
            const price = priceFormatter(calc);

            return (
              <li key={idx}>
                <div className={orderPrdListStyle.list_item_info}>
                  <Link href="">
                    <img src={image_path} />
                  </Link>
                  <div>
                    <Link href="">{name}</Link>
                    <div>
                      <div className="item_option">{`[옵션: ${val.product_option.name}]`}</div>
                      <div>{`수량: ${count}개`}</div>
                    </div>
                    <div>{price}원</div>
                  </div>
                  {/* <button onClick={() => onClickItemRemove(idx)}>
                    <ImCross />
                  </button> */}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="delivery_price">
          <span>배송비</span>
          <strong>{`${priceFormatter(deliveryPrice)}원`}</strong>
        </div>
      </div>
    </FoldContainer>
  );
}
