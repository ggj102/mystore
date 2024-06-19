"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signAction } from "./signinActions";

import FormLoading from "@/components/loading/formLoading";

import signinStyle from "@styles/pages/signin.module.scss";

const schema = yup.object().shape({
  user_id: yup.string().required(),
  password: yup.string().required(),
});

export default function Signin() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const isDisabled = isSubmitting || isSubmitSuccessful;

  const onSubmit = async (data: { user_id: string; password: string }) => {
    try {
      await signAction(data);
      setIsSubmitSuccessful(true);
    } catch (err: any) {
      alert(err.message);
      setIsSubmitSuccessful(false);
    }
  };

  return (
    <div className={signinStyle.signin_container}>
      <div className="site_wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>로그인</h3>
            <div className="field">
              <span>아이디</span>
              <input {...register("user_id")} disabled={isDisabled} />
            </div>
            <div className="field">
              <span>비밀번호</span>
              <input
                type="password"
                {...register("password")}
                disabled={isDisabled}
              />
            </div>
            {isSubmitting ? (
              <FormLoading
                className={signinStyle.submit_btn}
                width="30"
                height="30"
                strokeWidth="10"
              />
            ) : (
              <button
                className={signinStyle.submit_btn}
                type="submit"
                disabled={isSubmitSuccessful}
              >
                로그인
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
