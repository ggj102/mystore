import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import bestsSellerStyle from "@styles/pages/home/bestsSeller.module.scss";

export default function BestsSeller({ list }: { list: any }) {
  return (
    <div className={bestsSellerStyle.bests_seller_container}>
      <ViewInUp once={true}>
        <h3>
          <div>베스트셀러</div>
          <p>마이스토어의 베스트 아이템을 만나보세요!</p>
        </h3>
      </ViewInUp>
      <ul>
        {list.map((val: any) => {
          return (
            <li key={val.name}>
              <ProductItem data={val} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
