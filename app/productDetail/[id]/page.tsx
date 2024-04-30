import { Suspense } from "react";
import ProductDetail from "./components/productDetail";

export default function ProductDetailPage() {
  return (
    <Suspense>
      <ProductDetail />;
    </Suspense>
  );
}
