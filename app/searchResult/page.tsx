import api from "@/httpClient/auth";
import SearchResult from "./components/searchResult";

async function getServerSideProps(searchParams: SearchParmarsProps) {
  const paramsKeyword = searchParams.keyword;
  const paramsSort = searchParams.sort;
  const paramsPageNum = searchParams.page;

  const sortQuery = paramsSort ? `&sort=${paramsSort}` : "";
  const pageQuery = paramsPageNum ? `&page=${paramsPageNum}` : "";

  const searchResultData = await api.get(
    `/searchResult?keyword=${paramsKeyword}${sortQuery}${pageQuery}`
  );
  const keyword = String(paramsKeyword);
  const page = Number(paramsPageNum);

  return { searchResultData, keyword, sort: paramsSort, page };
}

export default async function SearchResultPage({
  searchParams,
}: {
  searchParams: SearchParmarsProps;
}) {
  const { searchResultData, keyword, sort, page } = await getServerSideProps(
    searchParams
  );

  return (
    <SearchResult
      searchResultData={searchResultData}
      keyword={keyword}
      sort={sort}
      page={page}
    />
  );
}
