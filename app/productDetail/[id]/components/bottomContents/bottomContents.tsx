import { useState } from "react";

import bottomContentsStyles from "@styles/pages/productDetail/bottomContents.module.scss";
import clsx from "clsx";

export default function BottomContents({
  productDetailData,
}: {
  productDetailData: any;
}) {
  const { product_detail } = productDetailData;

  const [currnetMenu, setCurrnetMenu] = useState<number>(0);

  const onClickMenu = (id: string, index: number) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "auto" });
    }

    setCurrnetMenu(index);
  };

  return (
    <div
      id="detailInfo"
      className={bottomContentsStyles.bottom_contents_container}
    >
      <div className={bottomContentsStyles.skicky_menu}>
        <button
          className={clsx({ current_menu: currnetMenu === 1 })}
          onClick={() => onClickMenu("detailInfo", 1)}
        >
          제품상세
        </button>
        <button
          className={clsx({ current_menu: currnetMenu === 2 })}
          onClick={() => onClickMenu("buyGuide", 2)}
        >
          상품구매안내
        </button>
        <button
          className={clsx({ current_menu: currnetMenu === 3 })}
          onClick={() => setCurrnetMenu(3)}
        >
          =
        </button>
        <button
          className={clsx({ current_menu: currnetMenu === 4 })}
          onClick={() => setCurrnetMenu(4)}
        >
          =
        </button>
      </div>
      {product_detail?.product_detail_image_path.length > 0 ? (
        <ul>
          {product_detail?.product_detail_image_path.map(
            (val: string, idx: number) => {
              return (
                <li key={idx}>
                  <img src={val} alt="prd_detail_img" />
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <div className={bottomContentsStyles.empty_info}>
          제품 상세 정보가 없습니다.
        </div>
      )}
      <div id="buyGuide" className={bottomContentsStyles.product_buy_guide}>
        <h2>상품구매안내</h2>
        <div>
          <h2>상품결제정보</h2>
          <div className="guide_info">
            고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도
            있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등
            정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할
            수 있습니다.
            <br />
            <br />
            무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은
            가까운 은행에서 직접 입금하시면 됩니다.
            <br />
            주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며,
            7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.
            <br />
          </div>
        </div>
        <div>
          <h2>배송정보</h2>
          <div className="guide_info">
            배송 방법 : 택배
            <br />
            배송 지역 : 전국지역
            <br />
            배송 비용 : 2,500원
            <br />
            배송 기간 : 3일 ~ 7일
            <br />
            배송 안내 : - 산간벽지나 도서지방은 별도의 추가금액을 지불하셔야
            하는 경우가 있습니다.
            <br />
            고객님께서 주문하신 상품은 입금 확인후 배송해 드립니다. 다만,
            상품종류에 따라서 상품의 배송이 다소 지연될 수 있습니다.
          </div>
        </div>
        <div>
          <h2>교환 및 반품정보</h2>
          <div className="guide_info">
            <strong>교환 및 반품 주소</strong>
            <br />
            -
            <br />
            <br />
            <strong>교환 및 반품이 가능한 경우</strong>
            <br />
            - 계약내용에 관한 서면을 받은 날부터 7일. 단, 그 서면을 받은 때보다
            재화등의 공급이 늦게 이루어진 경우에는 재화등을 공급받거나 재화등의
            공급이 시작된 날부터 7일 이내
            <br />
            - 공급받으신 상품 및 용역의 내용이 표시.광고 내용과 다르거나
            계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날 부터
            3월이내, 그사실을 알게 된 날 또는 알 수 있었던 날부터 30일이내
            <br />
            <br />
            <strong>교환 및 반품 불가능한 경우</strong>
            <br />
            - 이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우(다만,
            재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는
            청약철회를 할 수 있습니다)
            <br />
            - 이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히
            감소한 경우
            <br />
            - 시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히
            감소한 경우
            <br />
            - 복제가 가능한 재화등의 포장을 훼손한 경우
            <br />
            - 개별 주문 생산되는 재화 등 청약철회시 판매자에게 회복할 수 없는
            피해가 예상되어 소비자의 사전 동의를 얻은 경우
            <br />
            - 디지털 콘텐츠의 제공이 개시된 경우, (다만, 가분적 용역 또는 가분적
            디지털콘텐츠로 구성된 계약의 경우 제공이 개시되지 아니한 부분은
            청약철회를 할 수 있습니다.)
            <br />
            <br />
            ※ 고객님의 마음이 바뀌어 교환, 반품을 하실 경우 상품반송 비용은
            고객님께서 부담하셔야 합니다.
            <br />
            (색상 교환, 사이즈 교환 등 포함)
          </div>
        </div>
      </div>
    </div>
  );
}
