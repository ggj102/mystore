import { Controller } from "react-hook-form";
import DaumPostcode from "./daumPost";

import addressFieldStyle from "@styles/components/addressField.module.scss";

export default function AddressField({ control, setValue }: any) {
  const setAddress = (address: string, zone_code: string) => {
    setValue("address", address, { shouldValidate: true });
    setValue("zone_code", zone_code, { shouldValidate: true });
  };

  const onChangeReset = () => {
    setValue("address", "", { shouldValidate: true });
    setValue("zone_code", "", { shouldValidate: true });
  };

  return (
    <div className={addressFieldStyle.address_field_container}>
      <div className={addressFieldStyle.daum_postcode_wrap}>
        <Controller
          name="zone_code"
          control={control}
          defaultValue=""
          render={({ field: { value } }: any) => (
            <input
              className="disabled"
              placeholder="우편번호"
              value={value}
              disabled
              onChange={onChangeReset}
            />
          )}
        />
        <DaumPostcode setAddress={setAddress} />
      </div>
      <Controller
        name="address"
        control={control}
        defaultValue=""
        render={({ field: { value } }: any) => (
          <input
            className="disabled"
            placeholder="주소"
            disabled
            value={value}
            onChange={onChangeReset}
          />
        )}
      />
      <Controller
        name="detail_address"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }: any) => (
          <input
            placeholder="상세주소 입력"
            value={value}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
}
