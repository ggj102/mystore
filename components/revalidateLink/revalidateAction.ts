"use server";

import { revalidatePath } from "next/cache";

export async function revalidateAction(href: string) {
  revalidatePath(href, "page");
}
