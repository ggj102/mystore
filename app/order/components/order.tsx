"use client";
import { useEffect, useState } from "react";

import { getTotalPrice } from "@/utils/getTotalPrice";

import DeliveryAddressInfo from "./deliveryAddressInfo";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function Order({ userData, orderItem, priceData }: any) {
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<{
    price: number;
    delivery: number;
  }>(priceData);

  useEffect(() => {
    const total = getTotalPrice(orderItem);
    setTotalPrice(total);
  }, [orderItem]);

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
