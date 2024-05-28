import api from "@/httpClient/auth";
import AllProduct from "./components/allProduct";

async function getServerSideProps({ searchParams }: any) {
  const paramsCategory = searchParams.category;
  const paramsSort = searchParams.sort;
  const paramsPageNum = searchParams.page;

  const categoryQuery = paramsCategory ? `category=${paramsCategory}` : "";
  const sortQuery = paramsSort ? `sort=${paramsSort}` : "";
  const pageQuery = paramsPageNum ? `page=${paramsPageNum}` : "";

  const filter = [categoryQuery, sortQuery, pageQuery].filter((val) => val);
  const query = filter.join("&");

  const allProductlData = await api.get(`/productList?${query}`);

  const category = paramsCategory ? String(paramsCategory) : "";
  const sort = paramsSort;
  const page = Number(paramsPageNum);

  return { allProductlData, category, sort, page };
}

export default async function AllProductPage(props: any) {
  await getServerSideProps(props);
  const { allProductlData, category, sort, page } = await getServerSideProps(
    props
  );

  return (
    <AllProduct
      allProductlData={allProductlData}
      category={category}
      sort={sort}
      page={page}
    />
  );
}
