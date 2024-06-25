"use client";

import Link from "next/link";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { removeDeliveryItemAction } from "./deliveryActions";

import { FaPlusCircle } from "react-icons/fa";
import userDeliveryStyle from "@styles/pages/user/userDelivery/userDelivery.module.scss";

export default function UserDelivery({ data }: { data: UserDeliveryType[] }) {
  const onClickRemoveDeliveryItem = async (id: number, isDefault: boolean) => {
    if (isDefault)
      return alert(
        "기본 배송지는 삭제할 수 없습니다.\n기본 배송지 변경 후 삭제해 주세요."
      );

    const isConfirm = confirm("배송지를 삭제 하시겠습니까?");
    if (!isConfirm) return;

    const res = await removeDeliveryItemAction(id);

    if (res.error) tokenExpiredErrorMessage(res.message);
  };

  return (
    <div className={userDeliveryStyle.user_delivery_container}>
      <div>
        <div className={userDeliveryStyle.user_delivery_header}>
          <strong>배송지 관리</strong>
          <Link href="/user/delivery/addForm">
            배송지 등록 <FaPlusCircle />
          </Link>
        </div>
        {data.length > 0 ? (
          <ul>
            {data.map((val: UserDeliveryType, idx: number) => {
              const { phone_prefix, phone_start, phone_end } = val;

              const phone = `${phone_prefix}-${phone_start}-${phone_end}`;

              return (
                <li key={`${val.zone_code}${idx}`}>
                  <div>
                    <div className={userDeliveryStyle.recipient}>
                      <p>{val.recipient}</p>
                      <p>({val.name || val.recipient})</p>
                      {val.is_default && <div>기본배송지</div>}
                    </div>
                    <div className={userDeliveryStyle.delete_and_edit}>
                      <button
                        onClick={() =>
                          onClickRemoveDeliveryItem(val.id, val.is_default)
                        }
                      >
                        삭제
                      </button>
                      <Link
                        href={`/user/delivery/editForm?delivery_id=${val.id}`}
                      >
                        수정
                      </Link>
                    </div>
                  </div>
                  <div>{phone}</div>
                  <div>
                    {`${val.address} ${val.detail_address} (${val.zone_code})`}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className={userDeliveryStyle.empty}>배송지를 등록해주세요.</div>
        )}
      </div>
    </div>
  );
}
