import api from "@/httpClient/auth";
import Home from "./components/home";

async function getServerSideProps() {
  const homeData = await api.get("/home");

  return { homeData };
}

export default async function HomePage() {
  const { homeData } = await getServerSideProps();

  return <Home homeData={homeData} />;
}
