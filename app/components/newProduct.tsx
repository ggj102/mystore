import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";

import newProductStyle from "@styles/pages/home/newProduct.module.scss";

export default function NewProduct({ list }: { list: any }) {
  return (
    <div className={newProductStyle.new_product_container}>
      <ViewInUp once={true}>
        <h3>
          <div>신제품</div>
          <p>누구보다 빠르게 주목해야 할 신상</p>
        </h3>
      </ViewInUp>
      <ul>
        {list.map((val: any, idx: number) => {
          return (
            <li key={idx}>
              <ProductItem data={val} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
