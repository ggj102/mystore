import DaumPostcode from "./daumPost";

import addressFieldStyle from "@styles/components/addressField.module.scss";

export default function AddressField({
  register,
  setAddress,
  onChangeReset,
}: any) {
  return (
    <div className={addressFieldStyle.address_field_container}>
      <div className={addressFieldStyle.daum_postcode_wrap}>
        <input
          className="disabled"
          placeholder="우편번호"
          disabled
          {...register("address.zone_code")}
          onChange={onChangeReset}
        />
        <DaumPostcode setAddress={setAddress} />
      </div>
      <input
        className="disabled"
        placeholder="주소"
        disabled
        {...register("address.full_address")}
        onChange={onChangeReset}
      />
      <input placeholder="상세주소 입력" {...register("detail_address")} />
    </div>
  );
}
