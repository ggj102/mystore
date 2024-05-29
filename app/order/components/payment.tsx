"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { priceFormatter } from "@/utils/priceFormatter";
import { paymentAction } from "./orderActions";

import FoldContainer from "./foldContainer";

import orderStyle from "@styles/pages/order/order.module.scss";

export default function Payment({
  userData,
  orderItem,
  totalPrice,
  deliveryMessage,
}: any) {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_API_KEY;
  const customerKey = process.env.NEXT_PUBLIC_TOSS_SECRET_API_KEY;

  const { price, delivery } = totalPrice;

  const [paymentWidget, setPaymentWidget] = useState<any>();

  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const widgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    // ------  결제위젯 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price + delivery },
      { variantKey: "DEFAULT" }
    );

    widgetRef.current = paymentMethodsWidget;

    // ------  이용약관 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = widgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }
    // ------ 금액 업데이트 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price + delivery);
  }, [totalPrice]);

  const onClickPayment = async () => {
    const length = orderItem.length > 1 ? ` 외 ${orderItem.length - 1}건` : "";
    const orderName = `${orderItem[0].name}${length}`;
    const delivery_address = `${userData.user_address} ${userData.user_detail_address}`;

    const paymentMethod = widgetRef.current?.getSelectedPaymentMethod();
    const payment_method = paymentMethod?.easyPay
      ? paymentMethod?.easyPay?.provider
      : paymentMethod?.method;

    const bodyData = {
      order_name: orderName,
      recipient: userData.user_name,
      phone: userData.user_phone,
      delivery_address,
      delivery_message: deliveryMessage,
      payment_method,
    };

    try {
      await paymentAction(orderId, bodyData);
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName,
        successUrl: `http://localhost:3005/order/success?order_id=${orderId}`,
        failUrl: `${window.location.origin}/fail`,
      });
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
  };

  useEffect(() => {
    loadPaymentWidget(clientKey, customerKey).then((widget) => {
      setPaymentWidget(widget);
    });
  }, []);

  return (
    <>
      <FoldContainer title="결제수단">
        <div className="box_section">
          <div id="payment-widget" style={{ width: "100%" }} />
          <div id="agreement" style={{ width: "100%" }} />
        </div>
      </FoldContainer>
      <div className={orderStyle.payment_button}>
        <div>주문 내용을 확인하였으며 약관에 동의합니다.</div>
        <button onClick={onClickPayment}>
          {priceFormatter(price + delivery)}원 결제하기
        </button>
      </div>
    </>
  );
}
