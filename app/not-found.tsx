"use client";

import { useRouter } from "next/navigation";

import Link from "next/link";

import notFoundStyle from "@styles/components/notFound.module.scss";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={notFoundStyle.not_found_container}>
      <div>
        <h2>404 ERROR</h2>
        <div>
          <p>접근하신 주소의 페이지는 없는 페이지 입니다.</p>
          <p>주소를 다시 확인해주세요.</p>
        </div>
        <div>
          <Link href="/">메인으로</Link>
          <button type="button" onClick={() => router.back()}>
            이전으로
          </button>
        </div>
      </div>
    </div>
  );
}
