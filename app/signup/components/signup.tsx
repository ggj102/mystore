"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import SignupStyle from "@styles/pages/signup.module.scss";
import FieldContainer from "./fieldContainer";
import axios from "axios";

const schema = yup.object().shape({
  user_id: yup.string().required("아이디를 입력해주세요."),
  user_password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("user_password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인을 입력해주세요."),
  user_name: yup.string().required("이름을 입력해주세요."),
  user_phone: yup
    .string()
    .required("전화번호를 입력해주세요.")
    .matches(/^[0-9]{10,11}$/, "유효한 전화번호를 입력해주세요."),
  user_email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("유효한 이메일을 입력해주세요."),
  user_address: yup.string().required("주소를 입력해주세요."),
  user_detail_address: yup.string().required("상세주소를 입력해주세요."),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);

    const {
      user_id,
      user_password,
      user_name,
      user_email,
      user_phone,
      user_address,
      user_detail_address,
    } = data;

    // 여기에 회원가입 로직 추가

    axios.post("http://localhost:3005/signup", {
      user_id,
      user_password,
      user_name,
      user_email,
      user_phone,
      user_address,
      user_detail_address,
    });
  };

  //   test

  //   김광진
  //   01011111111
  //   goole@gmail.com
  //   서울시 서울구 서울동
  //   123번지

  return (
    <div className={SignupStyle.signup_container}>
      <div className="site_wrap">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h3>회원가입</h3>
            <FieldContainer fieldName="아이디">
              <input {...register("user_id")} />
              {errors.user_id && <p>{errors.user_id.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="비밀번호">
              <input type="password" {...register("user_password")} />
              {errors.user_password && <p>{errors.user_password.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="비밀번호확인">
              <input type="password" {...register("passwordConfirm")} />
              {errors.passwordConfirm && (
                <p>{errors.passwordConfirm.message}</p>
              )}
            </FieldContainer>
            <FieldContainer fieldName="이름">
              <input {...register("user_name")} />
              {errors.user_name && <p>{errors.user_name.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="전화번호">
              <input {...register("user_phone")} />
              {errors.user_phone && <p>{errors.user_phone.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="이메일">
              <input {...register("user_email")} />
              {errors.user_email && <p>{errors.user_email.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="주소">
              <input {...register("user_address")} />
              {errors.user_address && <p>{errors.user_address.message}</p>}
            </FieldContainer>
            <FieldContainer fieldName="상세주소">
              <input {...register("user_detail_address")} />
              {errors.user_detail_address && (
                <p>{errors.user_detail_address.message}</p>
              )}
            </FieldContainer>
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
