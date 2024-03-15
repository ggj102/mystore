import bottomContentsStyles from "@styles/pages/productDetail/bottomContents.module.scss";

export default function BottomContents() {
  const prdDetailImgArr = [1, 2, 3, 4, 5, 6];

  return (
    <div className={bottomContentsStyles.product_detail_bottom}>
      <div className={bottomContentsStyles.skicky_menu}>
        <button>제품상세</button>
        <button>상품구매안내</button>
        <button>리뷰</button>
        <button>Q&A</button>
      </div>
      <ul>
        {prdDetailImgArr.map((val, idx) => {
          return (
            <li key={idx}>
              <img
                src={`/images/test/prddetailimg${val}.jpg`}
                alt="prd_detail_img"
              />
            </li>
          );
        })}
      </ul>
      <div className={bottomContentsStyles.product_buy_guide}>
        <h2>상품구매안내</h2>
      </div>
    </div>
  );
}
