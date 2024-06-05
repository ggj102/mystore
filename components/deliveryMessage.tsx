"use client";

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import deliveryMessageStyle from "@styles/components/deliveryMessage.module.scss";

export default function DeliveryMessage({
  messageIndex,
  control,
  setValue,
}: any) {
  const [isMessageInput, setIsMessageInput] = useState<boolean>(false);
  const options = [
    { value: "0", label: "-- 메시지 선택 (선택사항) --" },
    { value: "1", label: "배송 전에 미리 연락바랍니다." },
    { value: "2", label: "부재 시 경비실에 맡겨주세요." },
    { value: "3", label: "부재 시 문 앞에 놓아주세요." },
    { value: "4", label: "빠른 배송 부탁드립니다." },
    { value: "5", label: "택배함에 보관해 주세요." },
    { value: "6", label: "직접 입력" },
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

  const onChangeSelect = (option: any) => {
    if (option.value === "6") {
      setIsMessageInput(true);
    } else {
      setIsMessageInput(false);
      setValue("direct_message", "");
    }

    setValue("message_index", option);
  };

  useEffect(() => {
    if (messageIndex) {
      const index = Number(messageIndex);
      if (index === 6) setIsMessageInput(true);

      setValue("message_index", options[index]);
    } else setValue("message_index", options[0]);
  }, [messageIndex]);

  return (
    <div className={deliveryMessageStyle.delivery_message_container}>
      <Controller
        name="message_index"
        control={control}
        defaultValue=""
        render={({ field: { value } }: any) => (
          <Select
            styles={customStyles}
            isSearchable={false}
            value={value || options[0]}
            options={options}
            onChange={onChangeSelect}
          />
        )}
      />
      {isMessageInput && (
        <Controller
          name="direct_message"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }: any) => (
            <textarea value={value} onChange={onChange} />
          )}
        />
      )}
    </div>
  );
}
