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
import FormLoading from "@/components/loading/formLoading";

import { IoMdCheckmark } from "react-icons/io";
import commonDeliveryFormStyle from "@styles/pages/user/userDelivery/commonDeliveryForm.module.scss";

export default function CommonDeliveryForm({
  data,
}: {
  data?: UserDeliveryType;
}) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(deliveryFormYupSchema),
    defaultValues: {
      phone_prefix: { value: "010", label: "010" },
    },
  });

  const initEditData = () => {
    if (!data) return;

    reset({
      name: data.name || "",
      recipient: data.recipient,
      address: data.address,
      zone_code: data.zone_code,
      detail_address: data.detail_address,
      phone_prefix: { value: data.phone_prefix, label: data.phone_prefix },
      phone_start: data.phone_start,
      phone_end: data.phone_end,
      direct_message: data.direct_message || "",
      is_default: data.is_default,
    });
  };

  const onSubmit = async (formData: DeliveryFormYupSchemaType) => {
    if (!isValid) return;

    let isConfirm = true;

    if (!formData.detail_address) {
      isConfirm = confirm("상세주소를 입력하지 않았습니다.\n진행하시겠습니까?");
    }

    if (!isConfirm) return;

    const submitData = {
      ...formData,
      phone_prefix: formData.phone_prefix.value,
      name: formData.name || "",
      direct_message: formData.direct_message || "",
    };

    try {
      if (data) await editSubmitAction(data.id, submitData);
      else await addSubmitAction(submitData);
    } catch (err) {
      tokenExpiredErrorMessage(err);
    }
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
            <div>배송지명</div>
            <input placeholder="배송지명" {...register("name")} />
          </div>
          <div className="field">
            <RequiredFieldTitle title="수령인" />
            <input placeholder="이름" {...register("recipient")} />
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
          {isSubmitting ? (
            <FormLoading height="30" width="30" strokeWidth="10" />
          ) : (
            <button type="submit" disabled={!isValid}>
              {data ? "수정" : "등록"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
