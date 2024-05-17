import { priceFormatter } from "@/utils/priceFormatter";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";
import completePaymentInfoStyle from "@styles/pages/orderComplete/completePaymentInfo.module.scss";

export default function CompletePaymentInfo({ totalPrice, list }: any) {
  const prdTotalPrice = list.reduce((acc: number, val: any) => {
    return acc + val.payment_price;
  }, 0);

  return (
    <div className={orderCompleteStyle.list_container}>
      <h3>결제정보</h3>
      <div className={completePaymentInfoStyle.complete_payment_info_container}>
        <div>
          주문상품
          <span>{priceFormatter(prdTotalPrice)}원</span>
        </div>
        {/* <div>
        <button>할인/부가결제</button>
        <span>-1,111원</span>
      </div> */}
        <div>
          배송비
          <span>0원</span>
        </div>
        <div>
          <h3>결제금액</h3>
          <strong>{priceFormatter(totalPrice)}원</strong>
        </div>
      </div>
    </div>
  );
}
