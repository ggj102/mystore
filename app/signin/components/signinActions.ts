"use server";

import api from "@/httpClient/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signAction(data: any) {
  return api.post("/signin", { ...data }).then(() => {
    revalidatePath("/", "layout");
    redirect("/");
  });
}
