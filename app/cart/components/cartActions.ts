"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

interface CreateOrderData {
  id: number;
  product_option: { option_id: number };
  cart_info: { count: number };
}

export async function createOrderAction(order_item: CreateOrderData[]) {
  const Cookie = getCookies();

  return api.post("/order", { order_item }, { headers: { Cookie } });
}

export async function updateCountAction(count: number, info: CartInfoType) {
  const Cookie = getCookies();

  return api.put("/cart", { ...info, count }, { headers: { Cookie } });
}

export async function itemRemoveAction(items: CartInfoType[]) {
  const Cookie = getCookies();

  return api.delete("/cart", { data: items }, { headers: { Cookie } });
}
