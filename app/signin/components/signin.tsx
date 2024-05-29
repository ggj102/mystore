"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import api from "@/httpClient/auth";
import { redirectAction } from "./signinActions";

const schema = yup.object().shape({
  user_id: yup.string().required("아이디를 입력해주세요."),
  user_password: yup.string().required("비밀번호를 입력해주세요."),
});

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { user_id: string; user_password: string }) => {
    api
      .post("/signin", { ...data })
      .then(() => {
        redirectAction();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <span>아이디</span>
        <input {...register("user_id")} />
        {errors.user_id && <p>{errors.user_id.message}</p>}
      </div>
      <div>
        <span>비밀번호</span>
        <input {...register("user_password")} />
        {errors.user_password && <p>{errors.user_password.message}</p>}
      </div>
      <button type="submit">로그인</button>
    </form>
  );
}
