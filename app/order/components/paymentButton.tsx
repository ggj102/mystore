import orderStyle from "@styles/pages/order/order.module.scss";

export default function PaymentButton({
  totalPaymentPrice,
  onClickPayment,
}: {
  totalPaymentPrice: number;
  onClickPayment: any;
}) {
  return (
    <div className={orderStyle.payment_button}>
      <div>주문 내용을 확인하였으며 약관에 동의합니다.</div>
      <button onClick={onClickPayment}>{totalPaymentPrice}원 결제하기</button>
    </div>
  );
}
