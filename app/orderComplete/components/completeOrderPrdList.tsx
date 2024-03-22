import Link from "next/link";

import completeOrderPrdListStyle from "@styles/pages/orderComplete/completeOrderPrdList.module.scss";

export default function CompleteOrderPrdList({ data }: any) {
  return (
    <div
      className={completeOrderPrdListStyle.complete_order_prd_list_container}
    >
      <ul>
        {data.map((val: any, idx: number) => {
          const { name, saleprice, count, option } = val;

          return (
            <li key={idx}>
              <div className={completeOrderPrdListStyle.list_item_info}>
                <Link href="">
                  <img src="/images/test/testitem3.jpg" />
                </Link>
                <div>
                  <Link href="">{name}</Link>
                  <div>
                    <div className="item_option">{`[옵션: ${option}]`}</div>
                    <div>{`수량: ${count}개`}</div>
                  </div>
                  <div>{saleprice * count}원</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={completeOrderPrdListStyle.total_price_info}></div>
    </div>
  );
}
