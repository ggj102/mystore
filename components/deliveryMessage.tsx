"use client";

import { Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import deliveryMessageStyle from "@styles/components/deliveryMessage.module.scss";

export default function DeliveryMessage({ control, setValue }: any) {
  const options = [
    { value: "0", label: "-- 메시지 선택 (선택사항) --" },
    { value: "1", label: "배송 전에 미리 연락바랍니다." },
    { value: "2", label: "부재 시 경비실에 맡겨주세요." },
    { value: "3", label: "부재 시 문 앞에 놓아주세요." },
    { value: "4", label: "빠른 배송 부탁드립니다." },
    { value: "5", label: "택배함에 보관해 주세요." },
  ];

  const customStyles: StylesConfig<any, false> = {
    control: (provided) => ({
      ...provided,
      height: "48px",
      border: "1px solid #dcdee0",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #dcdee0",
      },
    }),
  };

  const onChangeSelect = (newValue: SelectOptionType) => {
    if (newValue.value === "0") return;
    setValue("direct_message", newValue.label);
  };

  return (
    <div className={deliveryMessageStyle.delivery_message_container}>
      <Select
        styles={customStyles}
        isSearchable={false}
        value={options[0]}
        options={options}
        onChange={onChangeSelect}
      />
      <Controller
        name="direct_message"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <textarea value={value} onChange={onChange} />
        )}
      />
    </div>
  );
}
