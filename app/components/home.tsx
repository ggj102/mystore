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
  const [timesaleList, setTimesaleList] = useState<any>([]);
  const [newProductList, setNewProductList] = useState<any>([]);

  const getBestSellerList = (data: any) => {
    const sort = data.sort((a: any, b: any) => b.popularity - a.popularity);
    const slice = sort.slice(0, 4);

    setBestSellerList(slice);
  };

  const getTimesaleList = (data: any) => {
    const filter = data.filter((val: any) => val.time_sale);
    const slice = filter.slice(0, 8);
    const sort = slice.sort(
      (a: any, b: any) =>
        new Date(a.time_sale).getTime() - new Date(b.time_sale).getTime()
    );
    console.log(sort, "테스트");
    setTimesaleList(sort);
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
      getTimesaleList(res.data);
      getNewProductList(res.data);
    });
  }, []);

  return (
    <main className={homeStyles.home_container}>
      <MainBanner />
      <IconCategory />
      <BestsSeller list={bestSellerList} />
      <Timesale list={timesaleList} />
      <EventBanner />
      <IntroVideo />
      <NewProduct list={newProductList} />
    </main>
  );
}
