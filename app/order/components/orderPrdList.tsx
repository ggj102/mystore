import Link from "next/link";
import { ImCross } from "react-icons/im";

import FoldContainer from "./foldContainer";

import orderPrdListStyle from "@styles/pages/order/orderPrdList.module.scss";

export default function OrderPrdList({
  listData,
  totalPrdCount,
  setOrderPrdListData,
}: {
  listData: any;
  totalPrdCount: number;
  setOrderPrdListData: any;
}) {
  const onClickItemRemove = (id: number) => {
    const find = listData.find((val: any) => val.id === id);

    if (find) {
      const removeConfirm = confirm(`선택한 상품을 제거 하시겠습니까?`);

      if (removeConfirm) {
        const filter = listData.filter((val: any) => val.id !== id);
        setOrderPrdListData(filter);
      }
    }
  };

  return (
    <FoldContainer title="주문상품">
      <div className={orderPrdListStyle.order_prd_list_container}>
        <div>
          총 수량: <strong>{totalPrdCount}</strong>개
        </div>
        <ul>
          {listData.map((val: any, idx: number) => {
            const { id, name, saleprice, count, option } = val;

            return (
              <li key={idx}>
                <div className={orderPrdListStyle.list_item_info}>
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
                  <button onClick={() => onClickItemRemove(id)}>
                    <ImCross />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="delivery_price">
          <span>배송비</span>
          <strong>2,500원</strong>
        </div>
      </div>
    </FoldContainer>
  );
}
