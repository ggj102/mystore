import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import UserDelivery from "./components/userDelivery";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  try {
    const deliveryData = await api.get("/user/deliveryList", {
      headers: { Cookie },
    });

    return { deliveryData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function UserDeliveryPage() {
  const { deliveryData } = await getServerSideProps();

  return <UserDelivery data={deliveryData} />;
}
