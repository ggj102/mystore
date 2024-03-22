import completePaymentInfoStyle from "@styles/pages/orderComplete/completePaymentInfo.module.scss";

export default function CompletePaymentInfo({}) {
  return (
    <div className={completePaymentInfoStyle.complete_payment_info_container}>
      <div>
        주문상품
        <span>11,111원</span>
      </div>
      <div>
        <button>할인/부가결제</button>
        <span>-1,111원</span>
      </div>
      <div>
        배송비
        <span>+2,500원</span>
      </div>
      <div>
        <h3>결제금액</h3>
        <strong>76,543원</strong>
      </div>
    </div>
  );
}
