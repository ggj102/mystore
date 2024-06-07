import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { getTotalPrice } from "@/utils/getTotalPrice";

import Order from "./components/order";

async function getServerSideProps({ searchParams }: any) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const orderId = searchParams.order_id;

  const orderItem = await api.get(`/order/orderItem?order_id=${orderId}`, {
    headers: { Cookie },
  });
  const priceData = getTotalPrice(orderItem);

  try {
    const deliveryData = await api.get("/user/deliveryList", {
      headers: { Cookie },
    });

    return { deliveryData, orderItem, priceData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function OrderPage(props: any) {
  const { deliveryData, orderItem, priceData } = await getServerSideProps(
    props
  );

  return (
    <Order
      deliveryData={deliveryData}
      orderItem={orderItem}
      priceData={priceData}
    />
  );
}
