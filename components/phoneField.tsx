"use client";

import { Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";

import phoneFieldStyle from "@styles/components/phoneField.module.scss";

export default function PhoneField({ control, setValue }: any) {
  const options = [
    { value: "010", label: "010" },
    { value: "011", label: "011" },
    { value: "016", label: "016" },
    { value: "017", label: "017" },
    { value: "018", label: "018" },
    { value: "019", label: "019" },
    { value: "02", label: "02" },
    { value: "031", label: "031" },
    { value: "032", label: "032" },
    { value: "033", label: "033" },
    { value: "041", label: "041" },
    { value: "042", label: "042" },
    { value: "043", label: "043" },
    { value: "044", label: "044" },
    { value: "051", label: "051" },
    { value: "052", label: "052" },
    { value: "053", label: "053" },
    { value: "054", label: "054" },
    { value: "055", label: "055" },
    { value: "061", label: "061" },
    { value: "062", label: "062" },
    { value: "063", label: "063" },
    { value: "064", label: "064" },
    { value: "070", label: "070" },
    { value: "080", label: "080" },
    { value: "0130", label: "0130" },
    { value: "0303", label: "0303" },
    { value: "0502", label: "0502" },
    { value: "0503", label: "0503" },
    { value: "0504", label: "0504" },
    { value: "0505", label: "0505" },
    { value: "0506", label: "0506" },
    { value: "0507", label: "0507" },
    { value: "0508", label: "0508" },
    { value: "050", label: "050" },
    { value: "012", label: "012" },
    { value: "059", label: "059" },
  ];

  const customStyles: StylesConfig<any, false> = {
    control: (provided) => ({
      ...provided,
      width: "100px",
      height: "48px",
      border: "1px solid #dcdee0",
    }),
  };

  const onChangeNumber = (e: any, field?: string) => {
    const numberRegex = /^[0-9]*$/;
    const isValid = numberRegex.test(e.target.value);

    if (!isValid) return;

    setValue(`${field}`, e.target.value, {
      shouldValidate: true,
    });
  };

  return (
    <div className={phoneFieldStyle.phone_field_container}>
      <Controller
        name="phone_prefix"
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }: any) => (
          <Select
            styles={customStyles}
            isSearchable={false}
            value={value}
            onChange={onChange}
            options={options}
          />
        )}
      />
      <Controller
        name="phone_start"
        control={control}
        defaultValue=""
        render={({ field: { value } }: any) => (
          <input
            maxLength={4}
            value={value}
            onChange={(e) => onChangeNumber(e, "phone_start")}
          />
        )}
      />
      -
      <Controller
        name="phone_end"
        control={control}
        defaultValue=""
        render={({ field: { value } }: any) => (
          <input
            maxLength={4}
            value={value}
            onChange={(e) => onChangeNumber(e, "phone_end")}
          />
        )}
      />
    </div>
  );
}
