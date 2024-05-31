"use client";
import { useRef } from "react";

import UserHeader from "./userHeader";
import UserInterest from "./userInterest";

import userStyle from "@styles/pages/user/user.module.scss";

export default function User({ userData, homeData }: any) {
  const targetRef = useRef<any>(null);

  return (
    <div ref={targetRef} className={userStyle.user_container}>
      <div>
        <UserHeader userData={userData} />
        <UserInterest targetRef={targetRef} title="찜한" homeData={homeData} />
        <UserInterest
          targetRef={targetRef}
          title="최근 본"
          homeData={homeData}
        />
      </div>
    </div>
  );
}
