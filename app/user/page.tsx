import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import User from "./components/user";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const userData = await api.get("/user/myPage", { headers: { Cookie } });

  if (userData.error) return redirect("/signin");
  else {
    const RecentlyViewData = await api.get("/user/recentlyView", {
      headers: { Cookie },
    });

    return { userData, RecentlyViewData };
  }
}

export default async function UserPage() {
  const { userData, RecentlyViewData } = await getServerSideProps();

  return <User userData={userData} RecentlyViewData={RecentlyViewData} />;
}
