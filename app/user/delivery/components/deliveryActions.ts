"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function submitAction(data: any) {
  const Cookie = getCookies();

  return api.post("/user/delivery", data, { headers: { Cookie } });
}
