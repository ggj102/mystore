"use server";

import api from "@/httpClient/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCookies } from "@/utils/getCookies";

export async function addSubmitAction(data: any) {
  const Cookie = getCookies();

  return api.post("/user/delivery", data, { headers: { Cookie } }).then(() => {
    revalidatePath("/user/delivery", "page");
    redirect("/user/delivery");
  });
}

export async function editSubmitAction(id: number, data: any) {
  const Cookie = getCookies();

  return api
    .put("/user/delivery", { id, data }, { headers: { Cookie } })
    .then(() => {
      revalidatePath("/user/delivery", "page");
      redirect("/user/delivery");
    });
}

export async function removeDeliveryItemAction(id: number) {
  const Cookie = getCookies();

  return api
    .delete("/user/delivery", { id }, { headers: { Cookie } })
    .then(() => {
      revalidatePath("/user/delivery", "page");
    });
}
