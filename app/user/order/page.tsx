import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import UserOrder from "./components/userOrder";
import { getCookies } from "@/utils/getCookies";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  try {
    const orderData = await api.get("/user/order", { headers: { Cookie } });

    return { orderData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function UserOrderPage() {
  const { orderData } = await getServerSideProps();

  return <UserOrder data={orderData} />;
}
