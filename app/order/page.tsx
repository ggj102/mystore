import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { getTotalPrice } from "@/utils/getTotalPrice";

import Order from "./components/order";

async function getServerSideProps(searchParams: SearchParmarsProps) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const deliveryData = await api.get("/user/deliveryList", {
    headers: { Cookie },
  });

  if (deliveryData.error) return redirect("/signin");
  else {
    const orderId = searchParams.order_id;

    const orderItem = await api.get(`/order/orderItem?order_id=${orderId}`, {
      headers: { Cookie },
    });
    const priceData = getTotalPrice(orderItem);

    return { deliveryData, orderItem, priceData };
  }
}

export default async function OrderPage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { deliveryData, orderItem, priceData } = await getServerSideProps(
    searchParams
  );

  return (
    <Order
      deliveryData={deliveryData}
      orderItem={orderItem}
      priceData={priceData}
    />
  );
}
