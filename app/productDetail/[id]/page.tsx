import api from "@/httpClient/auth";
import ProductDetail from "./components/productDetail";

async function getServerSideProps({ params }: any) {
  const productDetailData = await api.get(`/productDetail/${params.id}`);

  return { productDetailData };
}

export default async function ProductDetailPage(props: any) {
  const { productDetailData } = await getServerSideProps(props);

  return <ProductDetail productDetailData={productDetailData} />;
}
