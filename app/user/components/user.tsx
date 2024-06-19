"use client";

import UserHeader from "./userHeader";
import UserInterest from "./userInterest";

import userStyle from "@styles/pages/user/user.module.scss";

export default function User({
  userData,
  RecentlyViewData,
}: {
  userData: {
    name: string;
    order_count: number;
    cart_count: number;
  };
  RecentlyViewData: ProductType[];
}) {
  return (
    <div className={userStyle.user_container}>
      <div>
        <UserHeader data={userData} />
        {/* <UserInterest targetRef={targetRef} title="찜한" data={homeData} /> */}
        <UserInterest title="최근 본" data={RecentlyViewData} />
      </div>
    </div>
  );
}
