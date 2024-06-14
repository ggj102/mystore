import Product from "../domain/product";
import { ProductDataFetch } from "./ports";

export const productDetailFetch = async (
  paramsId: number,
  detailFetch: ProductDataFetch["detailFetch"]
) => {
  const mockData = await detailFetch(paramsId);
  const productData = new Product(mockData);

  return productData;
};

export const productListFetch = async (
  listFetch: ProductDataFetch["listFetch"]
) => {
  const listData = await listFetch();
  const productList = listData.map((val) => new Product(val));

  return productList;
};
