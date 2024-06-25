"use client";

import Link from "next/link";

import { priceFormatter } from "@/utils/priceFormatter";
import { dateFormatter } from "@/utils/dateFormatter";
import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { orderDeleteAction } from "./userOrderActions";

import { ImCross } from "react-icons/im";

import userOrderStyle from "@styles/pages/user/userOrder.module.scss";

export default function UserOrder({ data }: { data: UserOrderData[] }) {
  const onClickOrderDelete = async (id: number) => {
    const isConfirm = confirm("주문내역을 삭제 하시겠습니까?");

    if (!isConfirm) return;

    const res = await orderDeleteAction(id);
    if (res.error) tokenExpiredErrorMessage(res.message);
  };

  return (
    <div className={userOrderStyle.user_order_container}>
      <div>
        <strong>주문내역</strong>
        {data.length > 0 ? (
          <ul>
            {data.map((val: UserOrderData, idx: number) => {
              return (
                <li key={idx}>
                  <div className="list_header">
                    <span className={userOrderStyle.order_product_name}>
                      {`${val.order_name} `}
                      {val.remain > 1 && (
                        <>
                          외<span>3</span>건
                        </>
                      )}
                    </span>
                    <button
                      type="button"
                      title="삭제"
                      onClick={() => onClickOrderDelete(val.id)}
                    >
                      <ImCross />
                    </button>
                  </div>
                  <div className={userOrderStyle.order_product_info}>
                    <div>
                      <img src={val.image_path} alt="img" />
                    </div>
                    <div className="text_wrap">
                      <div>{`${dateFormatter(val.updated_at)} 결제`}</div>
                      <div>
                        결제금액: {priceFormatter(val.total_payment_price)}원
                      </div>
                      <div>주문코드: {val.payment_key}</div>
                    </div>
                  </div>
                  <Link href={`/orderComplete?order_id=${val.id}`}>
                    주문 상세
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={userOrderStyle.empty}>주문내역이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
