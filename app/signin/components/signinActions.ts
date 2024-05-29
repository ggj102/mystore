"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import api from "@/httpClient/auth";

export async function signAction(data: any) {
  return api.post("/signin", { ...data }).then((res) => {
    const cookie = cookies();
    const value = res.cookie.replace("accessToken=", "");

    cookie.set("accessToken", value);

    revalidatePath("/", "layout");
    redirect("/");
  });
}
