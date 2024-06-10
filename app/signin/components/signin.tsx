"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { signAction } from "./signinActions";

import signinStyle from "@styles/pages/signin.module.scss";

const schema = yup.object().shape({
  user_id: yup.string().required(),
  password: yup.string().required(),
});

export default function Signin() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { user_id: string; password: string }) => {
    try {
      await signAction(data);
    } catch (err: any) {
      alert(err.message);
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
              <input {...register("user_id")} />
            </div>
            <div className="field">
              <span>비밀번호</span>
              <input {...register("password")} />
            </div>
            <button className={signinStyle.submit_btn} type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
