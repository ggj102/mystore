import { dateFormatter } from "@/utils/dateFormatter";
import { priceFormatter } from "@/utils/priceFormatter";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function PaymentResult({ data }: any) {
  return (
    <div className={orderCompleteStyle.payment_result}>
      <div className="img_text">
        <img src="/images/orderCompleteImg.png" alt="orderCompleteImg" />
        <br />
        고객님의 주문이
        <br />
        정상적으로 완료되었습니다.
      </div>
      <div className="payment_result_info">
        <div>
          결제일
          <span>{dateFormatter(data?.updated_at)}</span>
        </div>
        <div>
          결제금액
          <span>{priceFormatter(data?.total_payment_price)}원</span>
        </div>
        <div>
          주문코드
          <span>{data?.payment_key}</span>
        </div>
      </div>
    </div>
  );
}
