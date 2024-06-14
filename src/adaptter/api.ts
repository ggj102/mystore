import { ProductType } from "../domain/product";

const detailFetch = async (id: number) => {
  const data: ProductType[] = await fetch("/mockData.json").then((res) =>
    res.json()
  );

  const filter = data.filter((val) => val.id === id);

  return filter[0];
};

const listFetch = async () => {
  return await fetch("/mockData.json").then((res) => res.json());
};

export { detailFetch, listFetch };
