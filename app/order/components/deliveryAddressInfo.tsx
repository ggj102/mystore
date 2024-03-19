import { useState } from "react";
import Select from "react-select";

import FoldContainer from "./foldContainer";

import deliveryAddressInfoStyle from "@styles/pages/order/deliveryAddressInfo.module.scss";

export default function DeliveryAddressInfo({
  setDeliveryMessage,
}: {
  setDeliveryMessage: any;
}) {
  const options = [
    { value: "0", label: "-- 메시지 선택 (선택사항) --" },
    { value: "1", label: "배송 전에 미리 연락바랍니다." },
    { value: "2", label: "부재 시 경비실에 맡겨주세요." },
    { value: "3", label: "부재 시 문 앞에 놓아주세요." },
    { value: "4", label: "빠른 배송 부탁드립니다." },
    { value: "5", label: "택배함에 보관해 주세요." },
    { value: "6", label: "직접 입력" },
  ];

  const [isMessageInput, setIsMessageInput] = useState<boolean>(false);

  const onChangeOption = (e: any) => {
    if (e.value === "6") {
      return setIsMessageInput(true);
    } else setIsMessageInput(false);
    if (e.value === "0") return setDeliveryMessage("");

    setDeliveryMessage(e.label);
  };

  return (
    <FoldContainer title="배송지">
      <div className={deliveryAddressInfoStyle.delivery_address_info_container}>
        <div className="field">
          <span>받는사람</span>
          <strong>김광진</strong>
        </div>
        <div className="field">
          <span>주소</span>
          <strong>서울시 광진구 군자동 255번지</strong>
        </div>
        <div className="field">
          <span>휴대전화</span>
          <strong>010-1234-1234</strong>
        </div>
        <div className="select_message">
          <Select
            isSearchable={false}
            defaultValue={options[0]}
            onChange={onChangeOption}
            options={options}
          />
          {isMessageInput && (
            <textarea onChange={(e) => setDeliveryMessage(e.target.value)} />
          )}
        </div>
      </div>
    </FoldContainer>
  );
}
