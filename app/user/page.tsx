import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";

import User from "./components/user";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  try {
    const userData = await api.get("/user", { headers: { Cookie } });
    const homeData = await api.get("/home");
    return { homeData, userData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function UserPage() {
  const { homeData, userData } = await getServerSideProps();

  return <User userData={userData} homeData={homeData} />;
}
