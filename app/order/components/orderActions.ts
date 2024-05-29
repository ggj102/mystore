"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function itemRemoveAction(data: any) {
  const Cookie = getCookies();

  return api.delete("/order/orderItem", { data }, { headers: { Cookie } });
}

export async function paymentAction(orderId: any, data: any) {
  const Cookie = getCookies();

  return api.put(`/order?order_id=${orderId}`, data, {
    headers: { Cookie },
  });
}
