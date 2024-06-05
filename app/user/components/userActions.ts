"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

export async function getRecentlyViewAction() {
  const Cookie = getCookies();

  return api.get("/user/recentlyView", { headers: { Cookie } });
}
