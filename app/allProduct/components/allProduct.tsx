import Link from "next/link";
import ViewInUp from "@/components/animation/viewInUp";
import ProductItem from "@/components/productItem";
import allProductStyle from "@styles/pages/allProduct.module.scss";
import CustomSelect from "@/components/customSelect";

export default function AllProduct() {
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

  const concat1 = testBestsellerData.concat(testBestsellerData);
  const concat2 = concat1.concat(concat1);

  const categoryArr = ["토너", "크림", "선케어", "마스크", "클렌징", "바디"];

  const options = [
    { value: "0", label: "-정렬선택-" },
    { value: "1", label: "신상품" },
    { value: "2", label: "상품명" },
    { value: "3", label: "낮은가격" },
    { value: "4", label: "높은가격" },
    { value: "5", label: "제조사" },
    { value: "6", label: "사용후기" },
  ];

  return (
    <div className={allProductStyle.all_product_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>전체 상품</h3>
        </ViewInUp>
      </div>
      <div className="site_wrap">
        <ul className={allProductStyle.all_product_category}>
          {categoryArr.map((val, idx) => {
            return (
              <li key={idx}>
                <Link href="">{val}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="site_wrap">
        <div className={allProductStyle.all_product_list}>
          <div>
            <div className={allProductStyle.product_count}>
              전체
              <strong> {concat2.length}</strong>개
            </div>
            <CustomSelect options={options} />
          </div>
          <ul>
            {concat2.map((val, idx) => {
              return (
                <li key={idx}>
                  <ProductItem data={val} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
