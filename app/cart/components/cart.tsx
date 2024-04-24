"use client";

import { useState } from "react";
import Link from "next/link";
import ViewInUp from "@/components/animation/viewInUp";

import { ImCross } from "react-icons/im";
import ListCheckBox from "./listCheckBox";

import cartStyles from "@styles/pages/cart.module.scss";

export default function Cart() {
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

  const [cartList, setCartList] = useState<any>(testCartData);

  // const cartList = useAppSelector((state) => state.cart.carList);
  // const dispatch = useAppDispatch();
  // const [totalPrice, setTotalPrice] = useState<number>(0);

  // const onClickRemoveCart = (product: ProductType) => {
  //   const removeConfirm = confirm(
  //     `${product.name} 상품을 장바구니에서 제거 하시겠습니까?`
  //   );
  //   if (removeConfirm) dispatch(removeCartAction(product.id));
  // };

  // useEffect(() => {
  //   if (cartList.length > 0) {
  //     const total = cartList.reduce((acc: number, val: CartItemType) => {
  //       const price = val.product.price * val.count;

  //       return acc + price;
  //     }, 0);

  //     setTotalPrice(total);
  //   } else setTotalPrice(0);
  // }, [cartList]);

  // useEffect(() => {
  //   dispatch(initCartAction());
  // }, []);

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  const onClickTargetRemove = () => {
    const checkedFilter = cartList.filter((val: any) => !val.isChecked);
    if (checkedFilter.length === cartList.length) {
      return alert("선택한 상품이 없습니다.");
    }

    const removeConfirm = confirm(`선택한 상품을 제거 하시겠습니까?`);

    if (removeConfirm) {
      setCartList(checkedFilter);
    }
  };

  const onClickAllChecked = () => {
    const copy = [...cartList];
    const allCheckMap = copy.map((val) => {
      return { ...val, isChecked: !isAllChecked };
    });

    setIsAllChecked(!isAllChecked);
    setCartList(allCheckMap);
  };

  const onChangeChecked = (id: number) => {
    const copy = [...cartList];
    const findIdx = copy.findIndex((val) => val.id === id);

    if (findIdx !== -1) {
      copy[findIdx] = {
        ...copy[findIdx],
        isChecked: !copy[findIdx].isChecked,
      };

      setCartList(copy);
    }
  };

  const onClickItemRemove = (id: number) => {
    const find = cartList.find((val: any) => val.id === id);

    if (find) {
      const removeConfirm = confirm(`선택한 상품을 제거 하시겠습니까?`);

      if (removeConfirm) {
        const filter = cartList.filter((val: any) => val.id !== id);
        setCartList(filter);
      }
    }
  };

  return (
    <div className={cartStyles.cart_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>장바구니</h3>
        </ViewInUp>
        {cartList.length > 0 ? (
          <div className={cartStyles.cart_list_price}>
            <div className={cartStyles.cart_list}>
              <ul>
                {cartList.map((val: any, idx: number) => {
                  const { id, name, saleprice, isChecked, count, option } = val;

                  return (
                    <li key={idx}>
                      <div className={cartStyles.list_item_info}>
                        <ListCheckBox
                          id={id}
                          isChecked={isChecked}
                          onChangeChecked={onChangeChecked}
                        />
                        <Link href="">
                          <img src="/images/test/testitem3.jpg" />
                        </Link>
                        <div>
                          <div>
                            <Link href="">{name}</Link>
                            <div>{saleprice * count}원</div>
                            <div className="delivery_info">
                              배송 : [무료] / 기본배송
                            </div>
                            <div className="item_option">{`[옵션: ${option}]`}</div>
                          </div>
                          <strong>{saleprice * count}원</strong>
                        </div>
                        <button onClick={() => onClickItemRemove(id)}>
                          <ImCross />
                        </button>
                      </div>
                      <div className={cartStyles.item_order_btn}>
                        <div className="count_btn">
                          <button>-</button>
                          <input defaultValue={count} />
                          <button>+</button>
                        </div>
                        <div className="order_btn">
                          <button>관심상품</button>
                          <button>주문하기</button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className={cartStyles.summary}>[기본배송]</div>
              <div className={cartStyles.item_check_remove}>
                <button onClick={onClickAllChecked}>전체선택</button>
                <button onClick={onClickTargetRemove}>선택삭제</button>
              </div>
            </div>
            <div className={cartStyles.cart_total_price}>
              <h3>주문상품</h3>
              <div>
                <div className="flex">
                  <span>총 상품금액</span>
                  <span>
                    <strong>5,278,500</strong>원
                  </span>
                </div>
                <div className="flex">
                  <span>총 배송비</span>
                  <span>
                    <strong>0</strong>원
                  </span>
                </div>
              </div>
              <div className="total_price">
                <strong>결제예정금액</strong>
                <span>
                  <strong>5,278,500</strong>원
                </span>
              </div>
              <button>전체상품주문</button>
              <button>선택상품주문</button>
            </div>
            <div className={cartStyles.fixed_button}>
              <button>전체상품주문</button>
              <button>선택상품주문</button>
            </div>
          </div>
        ) : (
          <div className={cartStyles.empty_cart}>장바구니가 비어 있습니다.</div>
        )}
        <div className={cartStyles.info_use}>
          <h3>이용안내</h3>
          <div>
            장바구니 이용안내
            <br />
            <br />
            · 선택하신 상품의 수량을 변경하시려면 수량변경 후 [변경] 버튼을
            누르시면 됩니다.
            <br />
            · [쇼핑계속하기] 버튼을 누르시면 쇼핑을 계속 하실 수 있습니다.
            <br />
            · 장바구니와 관심상품을 이용하여 원하시는 상품만 주문하거나
            관심상품으로 등록하실 수 있습니다.
            <br />
            · 파일첨부 옵션은 동일상품을 장바구니에 추가할 경우 마지막에 업로드
            한 파일로 교체됩니다.
            <br />
            · 해외배송 상품과 국내배송 상품은 함께 결제하실 수 없으니 장바구니
            별로 따로 결제해 주시기 바랍니다.
            <br />
            · 해외배송 가능 상품의 경우 국내배송 장바구니에 담았다가 해외배송
            장바구니로 이동하여 결제하실 수 있습니다.
            <br />
            <br />
            <br />
            무이자할부 이용안내
            <br />
            <br />
            · 상품별 무이자할부 혜택을 받으시려면 무이자할부 상품만 선택하여
            [주문하기] 버튼을 눌러 주문/결제 하시면 됩니다.
            <br />
            · [전체 상품 주문] 버튼을 누르시면 장바구니의 구분없이 선택된 모든
            상품에 대한 주문/결제가 이루어집니다.
            <br />
            · 단, 전체 상품을 주문/결제하실 경우, 상품별 무이자할부 혜택을
            받으실 수 없습니다.
            <br />
            · 무이자할부 상품은 장바구니에서 별도 무이자할부 상품 영역에
            표시되어, 무이자할부 상품 기준으로 배송비가 표시됩니다.
            <br />· 실제 배송비는 함께 주문하는 상품에 따라 적용되오니 주문서
            하단의 배송비 정보를 참고해주시기 바랍니다.
          </div>
        </div>
      </div>
    </div>
  );
}
