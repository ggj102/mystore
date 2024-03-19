import FoldContainer from "./foldContainer";

import paymentInfoStyle from "@styles/pages/order/paymentInfo.module.scss";

export default function PaymentInfo({
  totalPaymentPrice,
}: {
  totalPaymentPrice: number;
}) {
  return (
    <FoldContainer title="결제정보">
      <div className={paymentInfoStyle.payment_info_container}>
        <div className="payment">
          <span>주문상품</span>
          <strong>24,000원</strong>
        </div>
        <div className="payment">
          <span>배송비</span>
          <strong>+2,500원</strong>
        </div>
        <div className="payment">
          <span>할인/부가결제</span>
          <strong>
            <span>-0</span>원
          </strong>
        </div>
        <div className="total_payment">
          <h3>최종 결제 금액</h3>
          <strong>{totalPaymentPrice}원</strong>
        </div>
      </div>
    </FoldContainer>
  );
}
