import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import OrderComplete from "./components/orderComplete";

async function getServerSideProps({ searchParams }: any) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const orderId = searchParams.order_id;

  try {
    const orderCompleteData = await api.get(`/order/?order_id=${orderId}`, {
      headers: { Cookie },
    });

    return { orderCompleteData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function OrderCompletePage(props: any) {
  const { orderCompleteData } = await getServerSideProps(props);

  return <OrderComplete orderCompleteData={orderCompleteData} />;
}
