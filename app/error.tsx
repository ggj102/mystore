"use client";

import { useRouter } from "next/navigation";

import errorStyle from "@styles/components/error.module.scss";

export default function Error() {
  const router = useRouter();

  return (
    <div className={errorStyle.error_container}>
      <div>
        <div>
          <p>서버 에러가 발생 하였습니다.</p>
          <p>서비스 이용에 불편을 드려 죄송합니다.</p>
        </div>
        <div>
          <button type="button" onClick={() => router.back()}>
            이전으로
          </button>
        </div>
      </div>
    </div>
  );
}
