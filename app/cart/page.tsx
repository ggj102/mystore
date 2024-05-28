import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { getTotalPrice } from "@/utils/getTotalPrice";

import Cart from "./components/cart";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  const cartData = await api.get("/cart", { headers: { Cookie } });

  const priceData = getTotalPrice(cartData);

  if (cartData) return { cartData, priceData };
  else return redirect("/signin");
}

export default async function CartPage() {
  const { cartData, priceData } = await getServerSideProps();

  return <Cart cartData={cartData} priceData={priceData} />;
}
