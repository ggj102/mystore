import { ProductType } from "../domain/product";

export interface ProductDataFetch {
  detailFetch(id: number): Promise<ProductType>;
  listFetch(): Promise<ProductType[]>;
}
