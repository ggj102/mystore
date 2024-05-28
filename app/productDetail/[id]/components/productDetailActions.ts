"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function updateCountAction(count: number, info: any) {
  const Cookie = getCookies();

  return api.put("/cart", { ...info, count }, { headers: { Cookie } });
}

export async function addCartAction(data: any) {
  const Cookie = getCookies();

  return api.post("/cart", data, { headers: { Cookie } });
}
