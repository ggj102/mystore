import api from "@/httpClient/auth";
import TimeSaleProduct from "./components/timeSaleProduct";

async function getServerSideProps(searchParams: SearchParmarsProps) {
  const paramsPageNum = searchParams.page;
  const timeSaleData = await api.get(`/timeSaleProduct?page=${paramsPageNum}`);
  const page = Number(paramsPageNum);

  return { timeSaleData, page };
}

export default async function TimeSaleProductPage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { timeSaleData, page } = await getServerSideProps(searchParams);

  return <TimeSaleProduct timeSaleData={timeSaleData} page={page} />;
}
