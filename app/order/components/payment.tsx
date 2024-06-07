"use client";

import { useEffect } from "react";

import FoldContainer from "./foldContainer";

export default function Payment({
  widgetRef,
  paymentWidget,
  priceData,
  setIsAgreement,
}: any) {
  const { price, delivery } = priceData;

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
    const paymentAgreement = paymentWidget.renderAgreement("#agreement", {
      variantKey: "AGREEMENT",
    });

    paymentAgreement.on("change", (agreementStatus: any) => {
      setIsAgreement(agreementStatus.agreedRequiredTerms);
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
  }, [priceData]);

  return (
    <FoldContainer title="결제수단">
      <div className="box_section">
        <div id="payment-widget" style={{ width: "100%" }} />
        <div id="agreement" style={{ width: "100%" }} />
      </div>
    </FoldContainer>
  );
}
