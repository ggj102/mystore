import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function PaymentMethod({ data }: any) {
  return (
    <div className={orderCompleteStyle.list_container}>
      <h3>결제수단</h3>
      <ul className={orderCompleteStyle.default_list}>
        <li>
          <span>결제수단</span>
          <div>
            <p>{data?.payment_method}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
