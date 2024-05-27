import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { getTotalPrice } from "@/utils/getTotalPrice";

import Order from "./components/order";

async function getServerSideProps({ searchParams }: any) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const orderId = searchParams.order_id;

  const userData = await api.get("/user", { headers: { Cookie } });
  const orderItem = await api.get(`/orderItem?order_id=${orderId}`, {
    headers: { Cookie },
  });
  const totalPrice = getTotalPrice(orderItem);

  if (userData) return { userData, orderItem, totalPrice };
  else return redirect("/signin");
}

export default async function OrderPage(props: any) {
  const { userData, orderItem, totalPrice } = await getServerSideProps(props);

  return (
    <Order userData={userData} orderItem={orderItem} totalPrice={totalPrice} />
  );
}
