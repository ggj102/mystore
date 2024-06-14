import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import CommonDeliveryForm from "../components/commonDeliveryForm";

async function getServerSideProps(searchParams: SearchParmarsProps) {
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

export default async function UserDeliveryEditFormPage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { deliveryData } = await getServerSideProps(searchParams);

  return <CommonDeliveryForm data={deliveryData} />;
}
