"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { deliveryFormYupSchema } from "./yupSchema";

import RequiredFieldTitle from "@/components/requiredFieldTitle";
import AddressField from "@/components/addressField";
import PhoneField from "@/components/phoneField";
import DeliveryMessage from "@/components/deliveryMessage";

import { IoMdCheckmark } from "react-icons/io";
import commonDeliveryFormStyle from "@styles/pages/user/userDelivery/commonDeliveryForm.module.scss";
import { submitAction } from "./deliveryActions";
import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { useRouter } from "next/navigation";

export default function CommonDeliveryForm() {
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(deliveryFormYupSchema),
  });

  const router = useRouter();

  const [deliveryMessage, setDeliveryMessage] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    if (!isValid) return;

    const { recipient, detail_address } = data;
    const { full_address, zone_code } = data.address;
    const { first, middle, last } = data.phone;

    const phone = `${first}${middle}${last}`;

    const submitData = {
      is_default: isDefault,
      recipient,
      phone,
      zone_code,
      address: full_address,
      detail_address,
      message: deliveryMessage,
    };

    try {
      await submitAction(submitData);

      router.push("/user/delivery");
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
  };

  const setPhoneNumber = (first: string, middle: string, last: string) => {
    setValue("phone", { first, middle, last });
    trigger("phone");
  };

  const setAddress = (full_address: string, zone_code: string) => {
    setValue("address", { full_address, zone_code });
    trigger("address");
  };

  const onChangeReset = () => {
    setValue("address", { full_address: "", zone_code: "" });
    trigger("address");
  };

  return (
    <div className={commonDeliveryFormStyle.user_commonDeliveryForm_container}>
      <div>
        <strong>배송지 등록</strong>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <RequiredFieldTitle title="수령인" />
            <input placeholder="이름" {...register("recipient")} />
          </div>
          <div className="field ">
            <RequiredFieldTitle title="배송지" />
            <AddressField
              register={register}
              setAddress={setAddress}
              onChangeReset={onChangeReset}
            />
          </div>
          <div className="field">
            <RequiredFieldTitle title="연락처" />
            <PhoneField setPhoneNumber={setPhoneNumber} />
          </div>
          <div className="field">
            <div>배송요청</div>
            <DeliveryMessage setDeliveryMessage={setDeliveryMessage} />
          </div>
          <div className={commonDeliveryFormStyle.is_default}>
            <label htmlFor="isDefault">
              <input
                type="checkbox"
                id="isDefault"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <div>
                <IoMdCheckmark />
              </div>
              <span>기본 배송지로 설정</span>
            </label>
          </div>
          <button type="submit" disabled={!isValid}>
            등록
          </button>
        </form>
      </div>
    </div>
  );
}
