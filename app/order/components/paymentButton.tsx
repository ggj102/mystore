import { priceFormatter } from "@/utils/priceFormatter";
import orderStyle from "@styles/pages/order/order.module.scss";

export default function PaymentButton({
  totalPrice,
  onClickPayment,
}: {
  totalPrice: any;
  onClickPayment: any;
}) {
  const { price, delivery } = totalPrice;

  return (
    <div className={orderStyle.payment_button}>
      <div>주문 내용을 확인하였으며 약관에 동의합니다.</div>
      <button onClick={onClickPayment}>
        {priceFormatter(price + delivery)}원 결제하기
      </button>
    </div>
  );
}
