"use client";

import MainBanner from "./components/mainBanner";
import IconCategory from "./components/iconCategory";
import BestsSeller from "./components/bestsSeller";
import Timesale from "./components/timesale";
import EventBanner from "./components/eventBanner";
import IntroVideo from "./components/introVideo";
import NewProduct from "./components/newProduct";

import homeStyles from "../styles/pages/home/home.module.scss";

export default function Home() {
  return (
    <main className={homeStyles.home_container}>
      <MainBanner />
      <IconCategory />
      <BestsSeller />
      <Timesale />
      <EventBanner />
      <IntroVideo />
      <NewProduct />
    </main>
  );
}
