"use server";

import api from "@/httpClient/auth";

export async function idDuplicationAction(id: any) {
  return api.post("/signup/idDuplicationCheck", {
    user_id: id,
  });
}

export async function signupSubmitAction(data: any) {
  return api.post("/signup", data);
}
