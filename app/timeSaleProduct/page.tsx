import api from "@/httpClient/auth";
import TimeSaleProduct from "./components/timeSaleProduct";

async function getServerSideProps({ searchParams }: any) {
  const paramsPageNum = searchParams.page;
  const timeSaleData = await api.get(`/timeSaleProduct?page=${paramsPageNum}`);
  const page = Number(paramsPageNum);

  return { timeSaleData, page };
}

export default async function TimeSaleProductPage(props: any) {
  const { timeSaleData, page } = await getServerSideProps(props);

  return <TimeSaleProduct timeSaleData={timeSaleData} page={page} />;
}
