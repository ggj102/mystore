"use client";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { deliveryFormYupSchema } from "./yupSchema";
import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { addSubmitAction, editSubmitAction } from "./deliveryActions";

import RequiredFieldTitle from "@/components/requiredFieldTitle";
import AddressField from "@/components/addressField";
import PhoneField from "@/components/phoneField";
import DeliveryMessage from "@/components/deliveryMessage";

import { IoMdCheckmark } from "react-icons/io";
import commonDeliveryFormStyle from "@styles/pages/user/userDelivery/commonDeliveryForm.module.scss";

export default function CommonDeliveryForm({ data }: any) {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(deliveryFormYupSchema),
  });

  const onSubmit = async (formData: any) => {
    if (!isValid) return;

    let isConfirm = true;

    if (!formData.detail_address) {
      isConfirm = confirm("상세주소를 입력하지 않았습니다.\n진행하시겠습니까?");
    }

    if (!isConfirm) return;

    const phone_prefix = formData.phone_prefix.value;
    const message_index = formData.message_index.value;

    const submitData = {
      ...formData,

      phone_prefix,
      message_index,
      direct_message: formData.direct_message || "",
    };

    try {
      if (data) await editSubmitAction(data.id, submitData);
      else await addSubmitAction(submitData);
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
  };

  const initEditData = () => {
    setValue("recipient", data.recipient);
    setValue("address", data.address);
    setValue("zone_code", data.zone_code);
    setValue("detail_address", data.detail_address);
    setValue("phone_start", data.phone_start);
    setValue("phone_end", data.phone_end);
    setValue("direct_message", data.direct_message || "");
    setValue("is_default", data.is_default);

    trigger();
  };

  const setAddress = (address: string, zone_code: string) => {
    setValue("address", address);
    setValue("zone_code", zone_code);
    trigger();
  };

  const onChangeReset = () => {
    setValue("address", "");
    setValue("zone_code", "");
    trigger();
  };

  useEffect(() => {
    if (data) initEditData();
  }, [data]);

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
            <PhoneField
              prefix={data?.phone_prefix}
              control={control}
              setValue={setValue}
            />
          </div>
          <div className="field">
            <div>배송요청</div>
            <DeliveryMessage
              messageIndex={data?.message_index}
              control={control}
              setValue={setValue}
            />
          </div>
          {!data?.is_default && (
            <div className={commonDeliveryFormStyle.is_default}>
              <label htmlFor="isDefault">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register("is_default")}
                />
                <div>
                  <IoMdCheckmark />
                </div>
                <span>기본 배송지로 설정</span>
              </label>
            </div>
          )}
          <button type="submit" disabled={!isValid}>
            {data ? "수정" : "등록"}
          </button>
        </form>
      </div>
    </div>
  );
}