"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function deleteOrderItemAction(index: number, orderItem: any) {
  const { id, order_id, product_option } = orderItem[index];

  const item = {
    order_id,
    item_id: id,
    option_id: product_option.option_id,
  };

  const Cookie = getCookies();

  return api
    .delete("/orderItem", { data: item }, { headers: { Cookie } })
    .then(() => {
      return orderItem.filter((val: any, idx: number) => idx !== index);
    });
}
