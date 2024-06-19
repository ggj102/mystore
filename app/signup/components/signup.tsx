"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { signupYupSchema } from "./yupSchema";
import { idDuplicationAction, signupSubmitAction } from "./signupActions";

import FieldContainer from "./fieldContainer";
import FielderrorMessage from "./fielderrorMessage";
import PhoneField from "@/components/phoneField";
import AddressField from "@/components/addressField";
import FormLoading from "@/components/loading/formLoading";

import SignupStyle from "@styles/pages/signup.module.scss";

export default function Signup() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);
  const [isIdDuplicationCheck, setIsIdDuplicationCheck] =
    useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupYupSchema),
    mode: "all",
    defaultValues: {
      phone_prefix: { value: "010", label: "010" },
    },
  });

  const isDisabled = isSubmitting || isSubmitSuccessful;

  const onSubmit = async (formData: SignupYupSchemaType) => {
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
      setIsSubmitSuccessful(true);
    } catch (err: any) {
      setIsSubmitSuccessful(false);
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

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("user_id", e.target.value, { shouldValidate: true });
    setIsIdDuplicationCheck(false);
  };

  return (
    <div className={SignupStyle.signup_container}>
      <div className="site_wrap">
        {isSubmitSuccessful ? (
          <div className={SignupStyle.signup_success}>
            <div>
              <p>가입이 성공적으로 완료되었습니다.</p>
              <div>
                <Link href="/signin">로그인</Link>
                <Link href="/">홈으로</Link>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h3>회원가입</h3>
              <FieldContainer fieldName="아이디">
                <div className={SignupStyle.id_field}>
                  <input
                    {...register("user_id")}
                    onChange={onChangeId}
                    disabled={isDisabled}
                  />
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
                <input
                  type="password"
                  {...register("password")}
                  disabled={isDisabled}
                />
                {errors.password && (
                  <FielderrorMessage message={errors.password.message} />
                )}
              </FieldContainer>
              <FieldContainer fieldName="비밀번호확인">
                <input
                  type="password"
                  {...register("passwordConfirm")}
                  disabled={isDisabled}
                />
                {errors.passwordConfirm && (
                  <FielderrorMessage message={errors.passwordConfirm.message} />
                )}
              </FieldContainer>
              <FieldContainer fieldName="이름">
                <input {...register("name")} disabled={isDisabled} />
                {errors.name && (
                  <FielderrorMessage message={errors.name.message} />
                )}
              </FieldContainer>
              <FieldContainer fieldName="이메일">
                <input {...register("email")} disabled={isDisabled} />
                {errors.email && (
                  <FielderrorMessage message={errors.email.message} />
                )}
              </FieldContainer>
              <FieldContainer fieldName="연락처">
                <PhoneField
                  isDisabled={isSubmitSuccessful}
                  control={control}
                  setValue={setValue}
                />
                {errors.phone_start ? (
                  <FielderrorMessage message={errors.phone_start.message} />
                ) : (
                  <FielderrorMessage message={errors.phone_end?.message} />
                )}
              </FieldContainer>
              <FieldContainer fieldName="주소">
                <AddressField
                  isDisabled={isDisabled}
                  control={control}
                  setValue={setValue}
                />
                {errors.address && (
                  <FielderrorMessage message={errors.address?.message} />
                )}
              </FieldContainer>
              {isSubmitting ? (
                <FormLoading
                  className={SignupStyle.submit_btn}
                  width="30"
                  height="30"
                  strokeWidth="10"
                />
              ) : (
                <button className={SignupStyle.submit_btn} type="submit">
                  가입하기
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
