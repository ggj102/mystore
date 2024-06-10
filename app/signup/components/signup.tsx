"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupYupSchema } from "./yupSchema";
import { idDuplicationAction, signupSubmitAction } from "./signupActions";

import FieldContainer from "./fieldContainer";
import FielderrorMessage from "./fielderrorMessage";
import PhoneField from "@/components/phoneField";
import AddressField from "@/components/addressField";

import SignupStyle from "@styles/pages/signup.module.scss";

export default function Signup() {
  const [isIdDuplicationCheck, setIsIdDuplicationCheck] =
    useState<boolean>(false);

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupYupSchema),
    mode: "all",
    defaultValues: {
      phone_prefix: { value: "010", label: "010" },
    },
  });

  const onSubmit = async (formData: any) => {
    if (!isIdDuplicationCheck) return alert("아이디 중복 확인을 해주세요.");

    const isConfirm = formData.detail_address
      ? true
      : confirm("상세주소를 입력하지 않았습니다.\n진행하시겠습니까?");
    if (!isConfirm) return;

    const bodyData = {
      user_id: formData.user_id,
      password: formData.password,
      name: formData.name,
      email: formData.email,
      deliveryData: {
        phone_prefix: formData.phone_prefix.value,
        phone_start: formData.phone_start,
        phone_end: formData.phone_end,
        zone_code: formData.zone_code,
        address: formData.address,
        detail_address: formData.detail_address || "",
      },
    };

    try {
      await signupSubmitAction(bodyData);

      const isConfirm = confirm(
        "회원가입이 완료되었습니다.\n로그인 페이지로 이동하시겠습니까?"
      );

      if (isConfirm) router.replace("/signin");
      else router.replace("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const onClickIdDuplicationCheck = async () => {
    if (isIdDuplicationCheck) return;

    const user_id = getValues("user_id");

    try {
      await idDuplicationAction(user_id);

      setIsIdDuplicationCheck(true);
      alert("사용 가능한 아이디 입니다.");
    } catch (err: any) {
      setIsIdDuplicationCheck(false);
      alert(err.message);
    }
  };

  const onChangeId = (e: any) => {
    setValue("user_id", e.target.value, { shouldValidate: true });
    setIsIdDuplicationCheck(false);
  };

  return (
    <div className={SignupStyle.signup_container}>
      <div className="site_wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>회원가입</h3>
            <FieldContainer fieldName="아이디">
              <div className={SignupStyle.id_field}>
                <input {...register("user_id")} onChange={onChangeId} />
                <button
                  type="button"
                  onClick={onClickIdDuplicationCheck}
                  disabled={isIdDuplicationCheck}
                >
                  중복 확인
                </button>
              </div>
              {errors.user_id && (
                <FielderrorMessage message={errors.user_id.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="비밀번호">
              <input type="password" {...register("password")} />
              {errors.password && (
                <FielderrorMessage message={errors.password.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="비밀번호확인">
              <input type="password" {...register("passwordConfirm")} />
              {errors.passwordConfirm && (
                <FielderrorMessage message={errors.passwordConfirm.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="이름">
              <input {...register("name")} />
              {errors.name && (
                <FielderrorMessage message={errors.name.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="이메일">
              <input {...register("email")} />
              {errors.email && (
                <FielderrorMessage message={errors.email.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="연락처">
              <PhoneField control={control} setValue={setValue} />
              {errors.phone_start ? (
                <FielderrorMessage message={errors.phone_start.message} />
              ) : (
                <FielderrorMessage message={errors.phone_end?.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="주소">
              <AddressField control={control} setValue={setValue} />
              {errors.address && (
                <FielderrorMessage message={errors.address?.message} />
              )}
            </FieldContainer>
            <button className={SignupStyle.submit_btn} type="submit">
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
