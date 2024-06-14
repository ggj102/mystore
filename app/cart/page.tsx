import { redirect } from "next/navigation";

import api from "@/httpClient/auth";
import { getCookies } from "@/utils/getCookies";
import { getTotalPrice } from "@/utils/getTotalPrice";

import Cart from "./components/cart";

async function getServerSideProps() {
  const Cookie = getCookies();
  if (!Cookie) return redirect("/signin");

  try {
    const cartData = await api.get("/cart", { headers: { Cookie } });
    const priceData = getTotalPrice(cartData);

    return { cartData, priceData };
  } catch (err) {
    return redirect("/signin");
  }
}

export default async function CartPage() {
  const { cartData, priceData } = await getServerSideProps();

  return <Cart cartData={cartData} priceData={priceData} />;
}
