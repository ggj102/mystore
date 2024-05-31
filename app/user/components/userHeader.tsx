import Link from "next/link";

import { FaRegUser } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";

import userStyle from "@styles/pages/user/user.module.scss";

export default function UserHeader({ userData }: any) {
  return (
    <div className={userStyle.user_header}>
      <div className={userStyle.user_setting}>
        <div className="name_wrap">
          <div className={userStyle.icon_wrap}>
            <FaRegUser size={33} />
          </div>
          <div>
            <span>{userData.user_name}</span>님
          </div>
        </div>
        <div className="setting_wrap">
          <Link href="">개인정보</Link>
          <Link href="">배송지 관리</Link>
        </div>
      </div>
      <div className={userStyle.order_cart}>
        <Link href="/user/order">
          <div className={userStyle.icon_wrap}>
            <TbReportMoney size={24} />
          </div>
          <div className="text_wrap">
            <div>주문내역</div>
            <span>0</span>
          </div>
        </Link>
        <Link href="/cart">
          <div className={userStyle.icon_wrap}>
            <BsCart2 size={24} />
          </div>
          <div className="text_wrap">
            <div>장바구니</div>
            <span>0</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
