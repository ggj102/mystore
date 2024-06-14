"use server";

import api from "@/httpClient/auth";

interface SignupSubmitActionData {
  user_id: string;
  password: string;
  name: string;
  email: string;
  deliveryData: {
    phone_prefix: string;
    phone_start: string;
    phone_end: string;
    zone_code: string;
    address: string;
    detail_address: string;
  };
}

export async function idDuplicationAction(id: string) {
  return api.post("/signup/idDuplicationCheck", {
    user_id: id,
  });
}

export async function signupSubmitAction(data: SignupSubmitActionData) {
  return api.post("/signup", data);
}
