"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/httpClient/auth";

export default function Signin() {
  const [currentId, setCurrentId] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const router = useRouter();

  const onClickLognin = () => {
    api
      .post("http://localhost:3005/signin", {
        user_id: currentId,
        user_password: currentPassword,
      })
      .then((res) => {
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          router.replace("/");
        }
      });
  };

  return (
    <div>
      <div>
        <span>아이디</span>
        <input
          value={currentId}
          onChange={(e) => setCurrentId(e.target.value)}
        />
      </div>
      <div>
        <span>비밀번호</span>
        <input
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <button onClick={onClickLognin}>로그인</button>
    </div>
  );
}
