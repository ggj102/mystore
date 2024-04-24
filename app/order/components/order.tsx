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

export default function Order() {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_API_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_SECRET_API_KEY;

  const testCartData = [
    {
      id: 1,
      name: "스킨 하이드로 트리트먼트",
      discription: "즉각 수분진정 효과로 쉽고 간편하게 피부 스트레스를 케어",
      saleprice: 209000,
      sale: 28,
      price: 290000,
      isChecked: false,
      count: 3,
      option: "optionA",
    },
    {
      id: 2,
      name: "에센스 UV 프로텍터",
      discription: "보습부터 자외선 차단까지 순한 데일리 선크림",
      saleprice: 49500,
      sale: 5,
      price: 52000,
      isChecked: false,
      count: 1,
      option: "optionB",
    },
    {
      id: 3,
      name: "타투 퍼퓸 패키지",
      discription: "향기와 함께 마음을 전해보세요",
      saleprice: 44000,
      sale: 25,
      price: 59000,
      isChecked: false,
      count: 2,
      option: "optionC",
    },
    {
      id: 4,
      name: "우드 헤어 브러쉬",
      discription: "트리트먼트와 같이 쓰면 더욱 좋은 우드 브러쉬",
      saleprice: 29000,
      sale: 28,
      price: 20900,
      isChecked: false,
      count: 1,
      option: "optionD",
    },
  ];

  const [paymentWidget, setPaymentWidget] = useState<any>();

  const [deliveryMessage, setDeliveryMessage] = useState<string>("");

  const [totalPaymentPrice, setTotalPaymentPrice] = useState<number>(0);
  const [orderPrdListData, setOrderPrdListData] = useState(testCartData);
  const [totalOrderPrdCount, setTotalOrderPrdCount] = useState<number>(0);

  const onClickPayment = async () => {
    const length =
      orderPrdListData.length > 1 ? ` 외 ${orderPrdListData.length - 1}건` : "";

    const orderName = `${orderPrdListData[0].name}${length}`;

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
    loadPaymentWidget(clientKey, customerKey).then((widget) => {
      setPaymentWidget(widget);
    });
  }, []);

  useEffect(() => {
    const countReduce = orderPrdListData.reduce((acc, val) => {
      return acc + val.count;
    }, 0);

    const totalPriceReduce = orderPrdListData.reduce((acc, val) => {
      return acc + val.count * val.saleprice;
    }, 0);

    setTotalOrderPrdCount(countReduce);
    setTotalPaymentPrice(totalPriceReduce);
  }, [orderPrdListData]);

  return (
    <div className={orderStyle.order_container}>
      <div>
        <div className={orderStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문/결제</h3>
        </div>
        <DeliveryAddressInfo setDeliveryMessage={setDeliveryMessage} />
        <OrderPrdList
          listData={orderPrdListData}
          totalPrdCount={totalOrderPrdCount}
          setOrderPrdListData={setOrderPrdListData}
        />
        <PaymentInfo totalPaymentPrice={totalPaymentPrice} />
        <Payment
          paymentWidget={paymentWidget}
          totalPaymentPrice={totalPaymentPrice}
        />
        <PaymentButton
          totalPaymentPrice={totalPaymentPrice}
          onClickPayment={onClickPayment}
        />
      </div>
    </div>
  );
}
