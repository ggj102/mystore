"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { revalidatePath } from "next/cache";

export async function orderDeleteAction(id: number) {
  const Cookie = getCookies();

  return api
    .delete("/user/order", { order_id: id }, { headers: { Cookie } })
    .then(() => {
      revalidatePath("/user/order", "page");
    });
}
