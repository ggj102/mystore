"use client";

import MainBanner from "./mainBanner";
import IconCategory from "./iconCategory";
import BestsSeller from "./bestsSeller";
import Timesale from "./timesale";
import EventBanner from "./eventBanner";
import IntroVideo from "./introVideo";
import NewProduct from "./newProduct";

import homeStyles from "@styles/pages/home/home.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [productList, setProductList] = useState<any>([]);

  const [bestSellerList, setBestSellerList] = useState<any>([]);
  const [newProductList, setNewProductList] = useState<any>([]);

  const getBestSellerList = (data: any) => {
    const sort = data.sort((a: any, b: any) => b.popularity - a.popularity);
    const slice = sort.slice(0, 4);

    setBestSellerList(slice);
  };

  const getNewProductList = (data: any) => {
    const sort = data.sort(
      (a: any, b: any) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
    const slice = sort.slice(0, 8);

    setNewProductList(slice);
  };

  useEffect(() => {
    axios.get("http://localhost:3005/allProductList").then((res: any) => {
      setProductList(res.data);
      getBestSellerList(res.data);
      getNewProductList(res.data);
    });
  }, []);

  return (
    <main className={homeStyles.home_container}>
      <MainBanner />
      <IconCategory />
      <BestsSeller list={bestSellerList} />
      <Timesale />
      <EventBanner />
      <IntroVideo />
      <NewProduct list={newProductList} />
    </main>
  );
}
