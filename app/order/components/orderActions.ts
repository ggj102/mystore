"use server";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

interface PaymentActionData {
  order_name: string;
  payment_method?: String;
  recipient: string;
  delivery_address: string;
  phone: string;
  delivery_message?: String;
}

// export async function itemRemoveAction(data: any) {
//   const Cookie = getCookies();

//   return api.delete("/order/orderItem", { data }, { headers: { Cookie } });
// }

export async function paymentAction(
  orderId: string | null,
  data: PaymentActionData
) {
  const Cookie = getCookies();

  return api.put(`/order?order_id=${orderId}`, data, {
    headers: { Cookie },
  });
}
