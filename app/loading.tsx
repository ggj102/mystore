"use client";
import { ThreeCircles } from "react-loader-spinner";

import loadingStyle from "@styles/components/loading/loading.module.scss";

export default function Loading() {
  return (
    <div className={loadingStyle.loading_container}>
      <div>
        <div className="logo_loading">
          <img src="/images/logo.png" alt="logo" />
          <div>
            <ThreeCircles
              visible={true}
              height="100%"
              width="100%"
              color="#000"
            />
          </div>
        </div>
        <span>페이지 구성 중...</span>
      </div>
    </div>
  );
}
