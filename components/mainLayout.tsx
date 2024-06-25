import { getCookies } from "@/utils/getCookies";
import api from "@/httpClient/auth";

import Header from "./header";

async function getServerSideProps() {
  const Cookie = getCookies();

  const userData = await api.get("/user", { headers: { Cookie } });
  if (userData.error) return { userData: undefined };
  else return { userData };
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData } = await getServerSideProps();

  return (
    <>
      <Header userData={userData} />
      {children}
    </>
  );
}
