"use client";
import { useState } from "react";

import DeliveryAddressInfo from "./deliveryAddressInfo";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function Order({ userData, orderItem, totalPrice }: any) {
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");

  return (
    <div className={orderStyle.order_container}>
      <div>
        <div className={orderStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문/결제</h3>
        </div>
        <DeliveryAddressInfo
          userData={userData}
          setDeliveryMessage={setDeliveryMessage}
        />
        <OrderPrdList
          orderItem={orderItem}
          deliveryPrice={totalPrice.delivery}
        />
        <PaymentInfo totalPrice={totalPrice} />
        <Payment
          userData={userData}
          orderItem={orderItem}
          totalPrice={totalPrice}
          deliveryMessage={deliveryMessage}
        />
      </div>
    </div>
  );
}
