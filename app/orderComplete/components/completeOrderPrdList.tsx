import Link from "next/link";

import { priceFormatter } from "@/utils/priceFormatter";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";
import completeOrderPrdListStyle from "@styles/pages/orderComplete/completeOrderPrdList.module.scss";

export default function CompleteOrderPrdList({ list }: any) {
  console.log(list);

  return (
    <div className={orderCompleteStyle.list_container}>
      <h3>주문상품</h3>
      <div
        className={completeOrderPrdListStyle.complete_order_prd_list_container}
      >
        <ul>
          {list.map((val: any, idx: number) => {
            const {
              item_id,
              item_name,
              image_path,
              count,
              item_option,
              payment_price,
            } = val;

            return (
              <li key={idx}>
                <div className={completeOrderPrdListStyle.list_item_info}>
                  <Link href={`/productDetail/${item_id}`}>
                    <img src={image_path} />
                  </Link>
                  <div>
                    <Link href={`/productDetail/${item_id}`}>{item_name}</Link>
                    <div>
                      <div className="item_option">{`[옵션: ${item_option}]`}</div>
                      <div>{`수량: ${count}개`}</div>
                    </div>
                    <div>{priceFormatter(payment_price)}원</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={completeOrderPrdListStyle.total_price_info}></div>
      </div>
    </div>
  );
}
