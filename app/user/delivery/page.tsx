import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import UserDelivery from "./components/userDelivery";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const deliveryData = await api.get("/user/deliveryList", {
    headers: { Cookie },
  });

  if (deliveryData.error) return redirect("/signin");
  else return { deliveryData };
}

export default async function UserDeliveryPage() {
  const { deliveryData } = await getServerSideProps();

  return <UserDelivery data={deliveryData} />;
}
