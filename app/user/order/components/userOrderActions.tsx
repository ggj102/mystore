"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { revalidatePath } from "next/cache";

export async function orderDeleteAction(id: number) {
  const Cookie = getCookies();

  return api
    .delete("/user/order", { order_id: id }, { headers: { Cookie } })
    .then((res) => {
      if (res.error) return res;
      else revalidatePath("/user/order", "page");
    });
}
