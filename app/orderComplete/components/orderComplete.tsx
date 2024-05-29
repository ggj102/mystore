"use client";

import { useRouter } from "next/navigation";

import PaymentResult from "./paymentResult";
import PaymentMethod from "./paymentMethod";
import DeliveryInfo from "./deliveryInfo";
import CompleteOrderPrdList from "./completeOrderPrdList";
import CompletePaymentInfo from "./completePaymentInfo";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function OrderComplete({
  orderCompleteData,
}: {
  orderCompleteData: any;
}) {
  const { order, order_item } = orderCompleteData;
  const router = useRouter();

  const onClickShopping = () => {
    router.push("/allProduct?page=1");
  };

  return (
    <div className={orderCompleteStyle.order_complete_container}>
      <div>
        <div className={orderCompleteStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문완료</h3>
        </div>
        <PaymentResult data={order} />
        <PaymentMethod data={order} />
        <DeliveryInfo data={order} />
        <CompleteOrderPrdList list={order_item} />
        <CompletePaymentInfo
          totalPrice={order?.total_payment_price}
          list={order_item}
        />
        <div className={orderCompleteStyle.bottom_btn}>
          <button>주문확인하기</button>
          <button onClick={onClickShopping}>쇼핑계속하기</button>
        </div>
      </div>
    </div>
  );
}
