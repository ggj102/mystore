"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function itemRemoveAction(index: number, orderItem: any) {
  const { id, order_id, product_option } = orderItem[index];

  const item = {
    order_id,
    item_id: id,
    option_id: product_option.option_id,
  };

  const Cookie = getCookies();

  return api
    .delete("/order/orderItem", { data: item }, { headers: { Cookie } })
    .then(() => {
      return orderItem.filter((val: any, idx: number) => idx !== index);
    });
}

export async function paymentAction(orderId: any, data: any) {
  const Cookie = getCookies();

  api.put(`/order?order_id=${orderId}`, data, {
    headers: { Cookie },
  });
}
