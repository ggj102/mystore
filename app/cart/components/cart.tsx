"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { tokenExpiredErrorMessage } from "@/httpClient/errorMessage";
import { priceFormatter } from "@/utils/priceFormatter";
import { getTotalPrice } from "@/utils/getTotalPrice";
import { GlobalContext } from "@/app/context";
import {
  createOrderAction,
  itemRemoveAction,
  updateCountAction,
} from "./cartActions";

import ViewInUp from "@/components/animation/viewInUp";
import CartItem from "./cartItem";
import CartGuide from "./cartGuide";

import cartStyles from "@styles/pages/cart.module.scss";

export default function Cart({
  cartData,
  priceData,
}: {
  cartData: CartItemType[];
  priceData: PriceDataType;
}) {
  const router = useRouter();
  const { setIsLoading, setLoadingText } = useContext(GlobalContext);
  const [cartList, setCartList] = useState<CartItemType[]>(cartData);
  const [totalPrice, setTotalPrice] = useState<PriceDataType>(priceData);

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [topBtnView, isTopBtnView] = useState<boolean>(true);

  // 수량 변경 이벤트
  const onClickUpdateCount = async (
    index: number,
    count: number,
    info: CartInfoType
  ) => {
    if (count === 0) alert("수량이 부족합니다 (최소 1개)");
    else {
      const res = await updateCountAction(count, info);

      if (res.error) tokenExpiredErrorMessage(res.message);
      else {
        const copy = [...cartList];

        copy[index] = {
          ...copy[index],
          cart_info: { ...copy[index].cart_info, count },
        };

        setCartList(copy);
      }
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

  const onChangeChecked = (index: number) => {
    const copy = [...cartList];

    copy[index] = {
      ...copy[index],
      isChecked: !copy[index].isChecked,
    };

    setCartList(copy);
  };

  // 아이템 삭제 함수

  const itemRemove = async (items: CartInfoType[], setData: CartItemType[]) => {
    const isConfirm = confirm("장바구니에서 제외 하시겠습니까?");

    if (isConfirm) {
      const res = await itemRemoveAction(items);
      if (res.error) tokenExpiredErrorMessage(res.message);
      else setCartList(setData);
    }
  };

  const onClickItemRemove = (index: number) => {
    const items = [{ ...cartList[index].cart_info }];
    const setData = cartList.filter(
      (val: CartItemType, idx: number) => idx !== index
    );

    itemRemove(items, setData);
  };

  const onClickSelectedRemove = () => {
    const checkedFilter = cartList.filter((val: CartItemType) => val.isChecked);
    if (checkedFilter.length === 0) {
      return alert("선택한 상품이 없습니다.");
    }

    const setData = cartList.filter((val: CartItemType) => !val.isChecked);
    const items = checkedFilter.map((val: CartItemType) => {
      return { ...val.cart_info };
    });

    itemRemove(items, setData);
  };

  const createOrder = async (data: CartItemType[]) => {
    setIsLoading(true);
    setLoadingText("주문/결제 페이지로 이동 중 입니다.");

    const res = await createOrderAction(data);

    if (res.error) tokenExpiredErrorMessage(res.message);
    else router.push(`/order?order_id=${res.order_id}`);
  };

  const onClickProductOrder = (index: number) => {
    const orderData = [cartList[index]];
    createOrder(orderData);
  };

  const onClickAllProductOrder = () => {
    createOrder(cartList);
  };

  const onClickSelectedProductOrder = () => {
    const orderData = cartList.filter((val: CartItemType) => val.isChecked);
    if (orderData.length === 0) {
      alert("선택한 상품이 없습니다.");
    } else createOrder(orderData);
  };

  useEffect(() => {
    const total = getTotalPrice(cartList);
    setTotalPrice(total);
  }, [cartList]);

  return (
    <div className={cartStyles.cart_container}>
      <div className="site_wrap">
        <ViewInUp once={true}>
          <h3>장바구니</h3>
        </ViewInUp>
        {cartList.length > 0 ? (
          <div className={cartStyles.cart_list_price}>
            <div className={cartStyles.cart_list}>
              <motion.div
                className={cartStyles.item_check_remove}
                onViewportEnter={() => isTopBtnView(true)}
                onViewportLeave={() => isTopBtnView(false)}
              >
                <button onClick={onClickAllChecked}>전체선택</button>
                <button onClick={onClickSelectedRemove}>선택삭제</button>
              </motion.div>
              <ul>
                {cartList.map((val: CartItemType, idx: number) => {
                  return (
                    <CartItem
                      key={idx}
                      index={idx}
                      data={val}
                      onClickUpdateCount={onClickUpdateCount}
                      onClickProductOrder={onClickProductOrder}
                      onChangeChecked={onChangeChecked}
                      onClickItemRemove={onClickItemRemove}
                    />
                  );
                })}
              </ul>
              {/* <div className={cartStyles.summary}>[기본배송]</div> */}
              {!topBtnView && (
                <div className={cartStyles.item_check_remove}>
                  <button onClick={onClickAllChecked}>전체선택</button>
                  <button onClick={onClickSelectedRemove}>선택삭제</button>
                </div>
              )}
            </div>
            <div className={cartStyles.cart_total_price}>
              <h3>주문상품</h3>
              <div>
                <div className="flex">
                  <span>총 상품금액</span>
                  <span>
                    <strong>{priceFormatter(totalPrice.price)}</strong>원
                  </span>
                </div>
                <div className="flex">
                  <span>총 배송비</span>
                  <span>
                    <strong>{priceFormatter(totalPrice.delivery)}</strong>원
                  </span>
                </div>
              </div>
              <div className="total_price">
                <strong>결제예정금액</strong>
                <span>
                  <strong>
                    {priceFormatter(totalPrice.price + totalPrice.delivery)}
                  </strong>
                  원
                </span>
              </div>
              <button onClick={onClickAllProductOrder}>전체상품주문</button>
              <button onClick={onClickSelectedProductOrder}>
                선택상품주문
              </button>
            </div>
            <div className={cartStyles.fixed_button}>
              <button onClick={onClickAllProductOrder}>전체상품주문</button>
              <button onClick={onClickSelectedProductOrder}>
                선택상품주문
              </button>
            </div>
          </div>
        ) : (
          <div className={cartStyles.empty_cart}>장바구니가 비어 있습니다.</div>
        )}
        <CartGuide />
      </div>
    </div>
  );
}
