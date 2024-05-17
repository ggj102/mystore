"use client";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

import { useAppSelector } from "@/src/adaptter/redux/hooks";
import { getTotalPrice } from "@/utils/getTotalPrice";

import DeliveryAddressInfo from "./deliveryAddressInfo";
import OrderPrdList from "./orderPrdList";
import PaymentInfo from "./paymentInfo";
import Payment from "./payment";
import PaymentButton from "./paymentButton";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function Order() {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_API_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_SECRET_API_KEY;

  const userData = useAppSelector((state) => state.user.user);

  const [orderList, setOrderList] = useState<any>([]);
  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [paymentWidget, setPaymentWidget] = useState<any>();

  const [totalPrice, setTotalPrice] = useState<any>({
    price: 0,
    delivery: 0,
  });

  const widgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const onClickItemRemove = (index: number) => {
    const isConfirm = confirm("주문에서 제외 하시겠습니까?");

    const { id, order_id, product_option } = orderList[index];

    const item = {
      order_id,
      item_id: id,
      option_id: product_option.option_id,
    };

    if (isConfirm) {
      return axios
        .delete("http://localhost:3005/orderItem", { data: item })
        .then(() => {
          const filter = orderList.filter(
            (val: any, idx: number) => idx !== index
          );
          setOrderList(filter);
        });
    }
  };

  const onClickPayment = () => {
    const length = orderList.length > 1 ? ` 외 ${orderList.length - 1}건` : "";
    const orderName = `${orderList[0].name}${length}`;
    const delivery_address = `${userData.address} ${userData.detail_address}`;

    const paymentMethod = widgetRef.current?.getSelectedPaymentMethod();
    const payment_method = paymentMethod?.easyPay
      ? paymentMethod?.easyPay?.provider
      : paymentMethod?.method;

    axios
      .put(`http://localhost:3005/order?order_id=${orderId}`, {
        order_name: orderName,
        recipient: userData.nick_name,
        phone: userData.phone,
        delivery_address,
        delivery_message: deliveryMessage,
        payment_method,
      })
      .then(async () => {
        try {
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
          await paymentWidget?.requestPayment({
            orderId: nanoid(),
            orderName,
            successUrl: `http://localhost:3005/success?order_id=${orderId}`,
            failUrl: `${window.location.origin}/fail`,
          });
        } catch (error) {
          alert(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadPaymentWidget(clientKey, customerKey).then((widget) => {
      setPaymentWidget(widget);
    });
  }, []);

  useEffect(() => {
    const priceData = getTotalPrice(orderList);
    setTotalPrice(priceData);
  }, [orderList]);

  useEffect(() => {
    if (orderId) {
      axios
        .get(`http://localhost:3005/orderItem?order_id=${orderId}`)
        .then((res) => {
          setOrderList(res.data);
        });
    }
  }, [searchParams]);

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
          deliveryPrice={totalPrice.delivery}
          onClickItemRemove={onClickItemRemove}
        />
        <PaymentInfo totalPrice={totalPrice} />
        <Payment
          widgetRef={widgetRef}
          paymentWidget={paymentWidget}
          totalPrice={totalPrice}
        />
        <PaymentButton
          totalPrice={totalPrice}
          onClickPayment={onClickPayment}
        />
      </div>
    </div>
  );
}
