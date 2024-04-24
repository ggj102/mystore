"use client";

import ListContainer from "./listContainer";
import CompletePaymentInfo from "./completePaymentInfo";
import CompleteOrderPrdList from "./completeOrderPrdList";

import orderCompleteStyle from "@styles/pages/orderComplete/orderComplete.module.scss";

export default function OrderComplete() {
  const paymentTypeData = [
    {
      listName: "결제수단",
      value: [
        "무통장입금",
        "입금자: 123123, 계좌번호 : 기타 123-123456-123123",
      ],
    },
  ];

  const deliveryAddressData = [
    { listName: "받는사람", value: ["김광진"] },
    { listName: "주소", value: ["12345 서울 광진구 군자동 255번지"] },
    { listName: "연락처", value: ["010-1234-1234"] },
    { listName: "배송요청", value: ["배송 전 메세지 요청"] },
  ];

  const testCartData = [
    {
      id: 1,
      name: "스킨 하이드로 트리트먼트",
      discription: "즉각 수분진정 효과로 쉽고 간편하게 피부 스트레스를 케어",
      saleprice: 209000,
      sale: 28,
      price: 290000,
      isChecked: false,
      count: 3,
      option: "optionA",
    },
    {
      id: 2,
      name: "에센스 UV 프로텍터",
      discription: "보습부터 자외선 차단까지 순한 데일리 선크림",
      saleprice: 49500,
      sale: 5,
      price: 52000,
      isChecked: false,
      count: 1,
      option: "optionB",
    },
    {
      id: 3,
      name: "타투 퍼퓸 패키지",
      discription: "향기와 함께 마음을 전해보세요",
      saleprice: 44000,
      sale: 25,
      price: 59000,
      isChecked: false,
      count: 2,
      option: "optionC",
    },
    {
      id: 4,
      name: "우드 헤어 브러쉬",
      discription: "트리트먼트와 같이 쓰면 더욱 좋은 우드 브러쉬",
      saleprice: 29000,
      sale: 28,
      price: 20900,
      isChecked: false,
      count: 1,
      option: "optionD",
    },
  ];

  return (
    <div className={orderCompleteStyle.order_complete_container}>
      <div>
        <div className={orderCompleteStyle.title_bar}>
          <div>MY STORE</div>
          <h3>주문완료</h3>
        </div>
        <div className={orderCompleteStyle.payment_result}>
          <div className="img_text">
            <img src="/images/orderCompleteImg.png" alt="orderCompleteImg" />
            <br />
            고객님의 주문이
            <br />
            정상적으로 완료되었습니다.
          </div>
          <div className="payment_result_info">
            <div>
              주문번호
              <span>12341234-12341234</span>
            </div>
            <div>
              결제금액
              <span>253,345원</span>
            </div>
          </div>
        </div>
        <ListContainer title="결제수단" data={paymentTypeData} />
        <ListContainer title="배송지" data={deliveryAddressData} />
        <ListContainer title="주문상품">
          <CompleteOrderPrdList data={testCartData} />
        </ListContainer>
        <ListContainer title="결제정보">
          <CompletePaymentInfo />
        </ListContainer>
        <div className={orderCompleteStyle.bottom_btn}>
          <button>주문확인하기</button>
          <button>쇼핑계속하기</button>
        </div>
      </div>
    </div>
  );
}
