"use client";
import Link from "next/link";

import PaymentResult from "./paymentResult";
import PaymentMethod from "./paymentMethod";
import DeliveryInfo from "./deliveryInfo";
import CompleteOrderPrdList from "./completeOrderPrdList";
import CompletePaymentInfo from "./completePaymentInfo";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function OrderComplete({
  orderCompleteData,
}: {
  orderCompleteData: {
    order: OrderCompleteType;
    order_item: OrderCompleteItemType[];
  };
}) {
  const { order, order_item } = orderCompleteData;

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
          list={order_item}
          totalPrice={order?.total_payment_price}
        />
        <div className={orderCompleteStyle.bottom_link}>
          <Link href="/user/order">주문확인하기</Link>
          <Link href="/allProduct?page=1">쇼핑계속하기</Link>
        </div>
      </div>
    </div>
  );
}
