import Link from "next/link";
import iconCategoryStyles from "@styles/pages/home/iconCategory.module.scss";

export default function IconCategory() {
  const categoryArr = [
    "타임특가",
    "새로나왔어요",
    "공식몰혜택",
    "첫구매",
    "무료샘플신청",
    "베스트셀러",
    "금액별사은품",
    "고객센터",
  ];

  return (
    <div className={iconCategoryStyles.icon_category_container}>
      <ul>
        {categoryArr.map((val, idx) => {
          return (
            <li key={val}>
              <Link href="">
                <img src={`/images/test/icon${idx + 1}.svg`} />
              </Link>
              <div>{val}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
