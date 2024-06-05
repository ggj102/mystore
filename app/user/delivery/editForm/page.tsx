import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import CommonDeliveryForm from "../components/commonDeliveryForm";

async function getServerSideProps({ searchParams }: any) {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const deliveryId = searchParams.delivery_id;

  try {
    const deliveryData = await api.get(
      `/user/delivery?delivery_id=${deliveryId}`,
      {
        headers: { Cookie },
      }
    );

    return { deliveryData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function UserDeliveryEditFormPage(props: any) {
  const { deliveryData } = await getServerSideProps(props);

  return <CommonDeliveryForm data={deliveryData} />;
}
