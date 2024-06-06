"use client";
import { useEffect, useState } from "react";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { getTotalPrice } from "@/utils/getTotalPrice";
import { itemRemoveAction } from "./orderActions";

import DeliveryAddressInfo from "./deliveryAddressInfo";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function Order({ userData, orderItem, priceData }: any) {
  const [orderList, setOrderList] = useState<any>(orderItem);
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<{
    price: number;
    delivery: number;
  }>(priceData);

  // const onClickItemRemove = async (index: number) => {
  //   const isConfirm = confirm("주문에서 제외 하시겠습니까?");

  //   if (isConfirm) {
  //     const { id, order_id, product_option } = orderItem[index];

  //     const item = {
  //       order_id,
  //       item_id: id,
  //       option_id: product_option.option_id,
  //     };

  //     try {
  //       await itemRemoveAction(item);

  //       const list = orderItem.filter((val: any, idx: number) => idx !== index);
  //       setOrderList(list);
  //     } catch (err) {
  //       tokenExpiredErrorMessage(err);
  //     }
  //   }
  // };

  useEffect(() => {
    const total = getTotalPrice(orderList);
    setTotalPrice(total);
  }, [orderList]);

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
          orderList={orderList}
          orderItem={orderItem}
          deliveryPrice={totalPrice.delivery}
          // onClickItemRemove={onClickItemRemove}
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
