import { getCookies } from "@/utils/getCookies";
import api from "@/httpClient/auth";

import Header from "./header";

async function getServerSideProps() {
  const Cookie = getCookies();

  try {
    const userData = await api.get("/user", { headers: { Cookie } });
    return { userData };
  } catch (err) {
    return { userData: undefined };
  }
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
