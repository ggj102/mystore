"use server";

import api from "@/httpClient/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCookies } from "@/utils/getCookies";

interface SubmitDataType extends DeliveryFormType {
  name: string;
  direct_message: string;
  is_default?: boolean;
  recipient: string;
  phone_prefix: string;
}

export async function addSubmitAction(data: SubmitDataType) {
  const Cookie = getCookies();

  return api.post("/user/delivery", data, { headers: { Cookie } }).then(() => {
    revalidatePath("/user/delivery", "page");
    redirect("/user/delivery");
  });
}

export async function editSubmitAction(id: number, data: SubmitDataType) {
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
