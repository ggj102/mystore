"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function addCartAction(
  data: { item_id: number; option_id: number; count: number }[]
) {
  const Cookie = getCookies();

  return api.post("/cart", data, { headers: { Cookie } });
}

export async function recentlyViewAction(id: number) {
  const Cookie = getCookies();
  if (!Cookie) return;

  try {
    await api.post("/user/recentlyView", { id }, { headers: { Cookie } });
  } catch (err) {
    return;
  }
}
