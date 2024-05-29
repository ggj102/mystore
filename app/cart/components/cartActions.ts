"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function createOrderAction(order_item: any) {
  const Cookie = getCookies();

  return api.post("/order", { order_item }, { headers: { Cookie } });
}

export async function updateCountAction(count: number, info: any) {
  const Cookie = getCookies();

  return api.put("/cart", { ...info, count }, { headers: { Cookie } });
}

export async function itemRemoveAction(items: any) {
  const Cookie = getCookies();

  return api.delete("/cart", { data: items }, { headers: { Cookie } });
}
