"use client";

import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import bestsSellerStyle from "@styles/pages/home/bestsSeller.module.scss";

export default function BestsSeller() {
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

  return (
    <div className={bestsSellerStyle.bests_seller_container}>
      <ViewInUp once={true}>
        <h3>
          <div>베스트셀러</div>
          <p>마이스토어의 베스트 아이템을 만나보세요!</p>
        </h3>
      </ViewInUp>
      <ul>
        {testBestsellerData.map((val) => {
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
