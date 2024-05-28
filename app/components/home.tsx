import MainBanner from "./mainBanner";
import IconCategory from "./iconCategory";
import BestsSeller from "./bestsSeller";
import Timesale from "./timesale";
import EventBanner from "./eventBanner";
import IntroVideo from "./introVideo";
import NewProduct from "./newProduct";

import homeStyles from "@styles/pages/home/home.module.scss";

export default function Home({ homeData }: any) {
  const { bestSeller, newProduct, timeSaleProduct } = homeData;

  return (
    <main className={homeStyles.home_container}>
      <MainBanner />
      <IconCategory />
      <BestsSeller list={bestSeller} />
      <Timesale list={timeSaleProduct} />
      <EventBanner />
      <IntroVideo />
      <NewProduct list={newProduct} />
    </main>
  );
}
