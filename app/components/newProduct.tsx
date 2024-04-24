import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";

import newProductStyle from "@styles/pages/home/newProduct.module.scss";

export default function NewProduct() {
  const testBestsellerData = [
    {
      name: "스킨 하이드로 트리트먼트",
      discription: "즉각 수분진정 효과로 쉽고 간편하게 피부 스트레스를 케어",
      saleprice: 209000,
      sale: 28,
      price: 290000,
    },
    {
      name: "에센스 UV 프로텍터",
      discription: "보습부터 자외선 차단까지 순한 데일리 선크림",
      saleprice: 49500,
      sale: 5,
      price: 52000,
    },
    {
      name: "타투 퍼퓸 패키지",
      discription: "향기와 함께 마음을 전해보세요",
      saleprice: 44000,
      sale: 25,
      price: 59000,
    },
    {
      name: "우드 헤어 브러쉬",
      discription: "트리트먼트와 같이 쓰면 더욱 좋은 우드 브러쉬",
      saleprice: 29000,
      sale: 28,
      price: 20900,
    },
  ];

  const concatArr = testBestsellerData.concat(testBestsellerData);

  return (
    <div className={newProductStyle.new_product_container}>
      <ViewInUp once={true}>
        <h3>
          <div>신제품</div>
          <p>누구보다 빠르게 주목해야 할 신상</p>
        </h3>
      </ViewInUp>
      <ul>
        {concatArr.map((val, idx) => {
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
