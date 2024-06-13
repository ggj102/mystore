import api from "@/httpClient/auth";
import ProductDetail from "./components/productDetail";

async function getServerSideProps(params: SearchParmarsProps) {
  const productDetailData = await api.get(`/productDetail/${params.id}`);

  return { productDetailData };
}

export default async function ProductDetailPage({
  params,
}: {
  params: SearchParmarsProps;
}) {
  const { productDetailData } = await getServerSideProps(params);

  return <ProductDetail productDetailData={productDetailData} />;
}
