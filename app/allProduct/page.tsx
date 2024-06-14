import api from "@/httpClient/auth";
import AllProduct from "./components/allProduct";

async function getServerSideProps(searchParams: SearchParmarsProps) {
  const paramsCategory = searchParams.category;
  const paramsSort = searchParams.sort;
  const paramsPageNum = searchParams.page;

  const categoryQuery = paramsCategory ? `category=${paramsCategory}` : "";
  const sortQuery = paramsSort ? `sort=${paramsSort}` : "";
  const pageQuery = paramsPageNum ? `page=${paramsPageNum}` : "";

  const filter = [categoryQuery, sortQuery, pageQuery].filter((val) => val);
  const query = filter.join("&");

  const allProductData = await api.get(`/allProduct?${query}`);

  const category = paramsCategory ? String(paramsCategory) : "";
  const sort = paramsSort;
  const page = Number(paramsPageNum);

  return { allProductData, category, sort, page };
}

export default async function AllProductPage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { allProductData, category, sort, page } = await getServerSideProps(
    searchParams
  );

  return (
    <AllProduct
      allProductData={allProductData}
      category={category}
      sort={sort}
      page={page}
    />
  );
}
