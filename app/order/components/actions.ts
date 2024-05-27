"use server";

import api from "@/httpClient/auth";

export async function deleteOrderItem(index: number, orderItem: any) {
  const { id, order_id, product_option } = orderItem[index];

  const item = {
    order_id,
    item_id: id,
    option_id: product_option.option_id,
  };

  return api.delete("/orderItem", { data: item }).then(() => {
    return orderItem.filter((val: any, idx: number) => idx !== index);
  });
}
