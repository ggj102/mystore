import MainBanner from "./mainBanner";
import BestsSeller from "./bestsSeller";
import Timesale from "./timesale";
import EventBanner from "./eventBanner";
import IntroVideo from "./introVideo";
import NewProduct from "./newProduct";

import homeStyles from "@styles/pages/home/home.module.scss";

interface HomeProps {
  homeData: {
    bestSeller: ProductType[];
    newProduct: ProductType[];
    introVideo: ProductType[];
    timeSaleProduct: ProductType[];
  };
}

export default function Home({ homeData }: HomeProps) {
  const { bestSeller, newProduct, introVideo, timeSaleProduct } = homeData;

  return (
    <main className={homeStyles.home_container}>
      <MainBanner />
      <BestsSeller list={bestSeller} />
      <Timesale list={timeSaleProduct} />
      <EventBanner />
      <IntroVideo list={introVideo} />
      <NewProduct list={newProduct} />
    </main>
  );
}
