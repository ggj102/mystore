import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import User from "./components/user";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  try {
    const userData = await api.get("/user/myPage", { headers: { Cookie } });
    const RecentlyViewData = await api.get("/user/recentlyView", {
      headers: { Cookie },
    });

    return { userData, RecentlyViewData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function UserPage() {
  const { userData, RecentlyViewData } = await getServerSideProps();

  return <User userData={userData} RecentlyViewData={RecentlyViewData} />;
}
