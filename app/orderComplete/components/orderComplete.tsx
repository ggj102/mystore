"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import axios from "axios";

import PaymentResult from "./paymentResult";
import PaymentMethod from "./paymentMethod";
import DeliveryInfo from "./deliveryInfo";
import CompleteOrderPrdList from "./completeOrderPrdList";
import CompletePaymentInfo from "./completePaymentInfo";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function OrderComplete() {
  const [orderCompleteData, setOrderCompleteData] = useState<any>();
  const [orderCompleteList, setOrderCompleteList] = useState<any>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const onClickShopping = () => {
    router.push("/allProduct?page=1");
  };

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:3005/order?order_id=${orderId}`)
        .then((res) => {
          setOrderCompleteData(res.data.order);
          setOrderCompleteList(res.data.order_item);
        });
    }
  }, [searchParams]);

  return (
    <div className={orderCompleteStyle.order_complete_container}>
      <div>
        <div className={orderCompleteStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문완료</h3>
        </div>
        <PaymentResult data={orderCompleteData} />
        <PaymentMethod data={orderCompleteData} />
        <DeliveryInfo data={orderCompleteData} />
        <CompleteOrderPrdList list={orderCompleteList} />
        <CompletePaymentInfo
          totalPrice={orderCompleteData?.total_payment_price}
          list={orderCompleteList}
        />
        <div className={orderCompleteStyle.bottom_btn}>
          <button>주문확인하기</button>
          <button onClick={onClickShopping}>쇼핑계속하기</button>
        </div>
      </div>
    </div>
  );
}
