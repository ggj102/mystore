import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import OrderComplete from "./components/orderComplete";

async function getServerSideProps(searchParams: SearchParmarsProps) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const orderId = searchParams.order_id;

  const orderCompleteData = await api.get(`/order?order_id=${orderId}`, {
    headers: { Cookie },
  });

  if (orderCompleteData.error) return redirect("/signin");
  else return { orderCompleteData };
}

export default async function OrderCompletePage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { orderCompleteData } = await getServerSideProps(searchParams);

  return <OrderComplete orderCompleteData={orderCompleteData} />;
}
