"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { signupYupSchema } from "./yupSchema";

import FieldContainer from "./fieldContainer";
import FielderrorMessage from "./fielderrorMessage";
import DaumPostcode from "@/components/daumPost";

import SignupStyle from "@styles/pages/signup.module.scss";

export default function Signup() {
  const [isIdDuplicationCheck, setIsIdDuplicationCheck] =
    useState<boolean>(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupYupSchema),
  });

  const onSubmit = (data: any) => {
    if (!isIdDuplicationCheck) {
      alert("아이디 중복 확인을 해주세요.");
    } else {
      const {
        user_id,
        user_password,
        user_name,
        user_email,
        user_phone,
        user_address,
        user_detail_address,
      } = data;

      axios
        .post("http://localhost:3005/signup", {
          user_id,
          user_password,
          user_name,
          user_email,
          user_phone,
          user_address,
          user_detail_address,
        })
        .then(() => {
          const isConfirm = confirm(
            "회원가입이 완료되었습니다.\n로그인 페이지로 이동하시겠습니까?"
          );

          if (isConfirm) {
            router.replace("/signin");
          } else {
            router.replace("/");
          }
        })
        .catch((err) => {
          if (err.response.status === 409) {
            alert("중복된 아이디 입니다.");
          }
        });
    }
  };

  const onClickIdDuplicationCheck = () => {
    if (isIdDuplicationCheck) return;

    const user_id = getValues("user_id");

    axios
      .post("http://localhost:3005/signup/idDuplicationCheck", { user_id })
      .then(() => {
        setIsIdDuplicationCheck(true);
        alert("사용 가능한 아이디 입니다.");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setIsIdDuplicationCheck(false);
          alert("중복된 아이디 입니다.");
        }
      });
  };

  const setAddress = (value: string) => {
    setValue("user_address", value, { shouldValidate: true });
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
                <div>
                  <input {...register("user_id")} onChange={onChangeId} />
                  {errors.user_id && (
                    <FielderrorMessage message={errors.user_id.message} />
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClickIdDuplicationCheck}
                  disabled={isIdDuplicationCheck}
                >
                  중복 확인
                </button>
              </div>
            </FieldContainer>
            <FieldContainer fieldName="비밀번호">
              <input type="password" {...register("user_password")} />
              {errors.user_password && (
                <FielderrorMessage message={errors.user_password.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="비밀번호확인">
              <input type="password" {...register("passwordConfirm")} />
              {errors.passwordConfirm && (
                <FielderrorMessage message={errors.passwordConfirm.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="이름">
              <input {...register("user_name")} />
              {errors.user_name && (
                <FielderrorMessage message={errors.user_name.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="휴대폰번호 ( '-' 제외)">
              <input {...register("user_phone")} />
              {errors.user_phone && (
                <FielderrorMessage message={errors.user_phone.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="이메일">
              <input {...register("user_email")} />
              {errors.user_email && (
                <FielderrorMessage message={errors.user_email.message} />
              )}
            </FieldContainer>
            <FieldContainer fieldName="주소">
              <input {...register("user_address")} readOnly />
              {errors.user_address && (
                <FielderrorMessage message={errors.user_address.message} />
              )}
              <DaumPostcode setAddress={setAddress} />
            </FieldContainer>
            <FieldContainer fieldName="상세주소">
              <input {...register("user_detail_address")} />
              {errors.user_detail_address && (
                <FielderrorMessage
                  message={errors.user_detail_address.message}
                />
              )}
            </FieldContainer>
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
