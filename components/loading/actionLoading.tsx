"use client";

import { GlobalContext } from "@/app/context";
import { useContext } from "react";

import { FallingLines } from "react-loader-spinner";
import actionLoadingStyle from "@styles/components/loading/actionLoading.module.scss";

export default function ActionLoading() {
  const { isLoading, loadingText } = useContext(GlobalContext);

  return (
    isLoading && (
      <div className={actionLoadingStyle.action_loading_container}>
        <div>
          <FallingLines visible={true} height="80" width="80" color="#1381e1" />
          <div>{loadingText}</div>
        </div>
      </div>
    )
  );
}
