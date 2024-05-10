"use client";
import { useEffect, useState } from "react";

import { nanoid } from "nanoid";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

import DeliveryAddressInfo from "./deliveryAddressInfo";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";
import PaymentButton from "./paymentButton";

import orderStyle from "@styles/pages/order/order.module.scss";
import { useAppDispatch, useAppSelector } from "@/src/adaptter/redux/hooks";
import axios from "axios";
import { updateOrderAction } from "@/src/adaptter/redux/reducer/orderReducer";
import { getTotalPrice } from "@/utils/getTotalPrice";

export default function Order() {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_API_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_SECRET_API_KEY;

  const userData = useAppSelector((state) => state.user.user);
  const orderList = useAppSelector((state) => state.order.orderList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(orderList, "주문데이터");
  }, [orderList]);

  const [paymentWidget, setPaymentWidget] = useState<any>();

  const [totalPrice, setTotalPrice] = useState<any>({
    price: 0,
    delivery: 0,
  });

  const onClickItemRemove = (index: number) => {
    const isConfirm = confirm("주문에서 제외 하시겠습니까?");

    const items = [{ ...orderList[index].cart_info }];

    if (isConfirm) {
      return axios
        .delete("http://localhost:3005/cart", { data: items })
        .then(() => {
          const filter = orderList.filter(
            (val: any, idx: number) => idx !== index
          );
          dispatch(updateOrderAction(filter));
        });
    }
  };

  const onClickPayment = async () => {
    const length = orderList.length > 1 ? ` 외 ${orderList.length - 1}건` : "";

    const orderName = `${orderList[0].name}${length}`;

    try {
      // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName,
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log(clientKey, customerKey);

    loadPaymentWidget(clientKey, customerKey).then((widget) => {
      setPaymentWidget(widget);
    });
  }, []);

  useEffect(() => {
    const priceData = getTotalPrice(orderList);
    setTotalPrice(priceData);
  }, [orderList]);

  return (
    <div className={orderStyle.order_container}>
      <div>
        <div className={orderStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문/결제</h3>
        </div>
        <DeliveryAddressInfo userData={userData} />
        <OrderPrdList
          orderList={orderList}
          deliveryPrice={totalPrice.delivery}
          onClickItemRemove={onClickItemRemove}
        />
        <PaymentInfo totalPrice={totalPrice} />
        <Payment paymentWidget={paymentWidget} totalPrice={totalPrice} />
        <PaymentButton
          totalPrice={totalPrice}
          onClickPayment={onClickPayment}
        />
      </div>
    </div>
  );
}
