import { useEffect, useState } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import FoldContainer from "./foldContainer";
import RequiredFieldTitle from "@/components/requiredFieldTitle";
import AddressField from "@/components/addressField";
import PhoneField from "@/components/phoneField";
import DeliveryMessage from "@/components/deliveryMessage";

import deliveryAddressFormStyle from "@styles/pages/order/deliveryAddressForm.module.scss";

export default function DeliveryAddressForm({
  control,
  deliveryData,
  setValue,
  onChangeOption,
}: any) {
  const [options, setOptions] = useState<any>([]);

  const customStyles: StylesConfig<any, false> = {
    control: (provided) => ({
      ...provided,
      width: "200px",
    }),
    menu: (provided) => ({
      ...provided,
      display: "block",
      width: "200px",
    }),

    menuList: (provided) => ({
      ...provided,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
  };

  const initOptions = () => {
    const dataMap = deliveryData.map((val: any, idx: number) => {
      return {
        value: idx,
        label: `${val.recipient}(${val.name || val.recipient})`,
      };
    });

    // dataMap.push({
    //   value: "1231",
    //   label: "김광진김광진김광진김광진김광진김광진김광진김광진김광진김광진",
    // });

    setOptions(dataMap);
  };

  useEffect(() => {
    if (deliveryData) initOptions();
  }, [deliveryData]);

  return (
    <FoldContainer title="배송지">
      <div className={deliveryAddressFormStyle.select_wrap}>
        <Link href="/user/delivery">배송지 관리</Link>
        <Controller
          name="delivery_option"
          control={control}
          defaultValue=""
          render={({ field: { value } }: any) => (
            <Select
              styles={customStyles}
              placeholder="배송지 관리"
              isSearchable={false}
              value={value}
              options={options}
              onChange={onChangeOption}
            />
          )}
        />
      </div>
      <div className={deliveryAddressFormStyle.delivery_address_form}>
        <div className="field">
          <div>배송지명</div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }: any) => (
              <input placeholder="배송지명" value={value} onChange={onChange} />
            )}
          />
        </div>
        <div className="field">
          <RequiredFieldTitle title="수령인" />
          <Controller
            name="recipient"
            control={control}
            defaultValue=""
            render={({ field: { value, onChange } }: any) => (
              <input placeholder="이름" value={value} onChange={onChange} />
            )}
          />
        </div>
        <div className="field ">
          <RequiredFieldTitle title="배송지" />
          <AddressField control={control} setValue={setValue} />
        </div>
        <div className="field">
          <RequiredFieldTitle title="연락처" />
          <PhoneField control={control} setValue={setValue} />
        </div>
        <div className="field">
          <div>배송요청</div>
          <DeliveryMessage control={control} setValue={setValue} />
        </div>
      </div>
    </FoldContainer>
  );
}
