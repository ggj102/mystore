import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function DeliveryInfo({ data }: any) {
  return (
    <div className={orderCompleteStyle.list_container}>
      <h3>배송지</h3>
      <ul className={orderCompleteStyle.default_list}>
        <li>
          <span>받는사람</span>
          <div>
            <p>{data?.recipient}</p>
          </div>
        </li>
        <li>
          <span>주소</span>
          <div>
            <p>{data?.delivery_address}</p>
          </div>
        </li>
        <li>
          <span>연락처</span>
          <div>
            <p>{data?.phone}</p>
          </div>
        </li>
        <li>
          <span>배송요청</span>
          <div>
            <p>{data?.delivery_message || "-"}</p>
          </div>
        </li>
      </ul>
    </div>
  );
}