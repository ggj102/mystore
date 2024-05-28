"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { priceFormatter } from "@/utils/priceFormatter";
import { getTotalPrice } from "@/utils/getTotalPrice";

import {
  createOrderAction,
  itemRemoveAction,
  updateCountAction,
} from "./cartActions";

import ViewInUp from "@/components/animation/viewInUp";
import CartItem from "./cartItem";
import CartGuide from "./cartGuide";

import cartStyles from "@styles/pages/cart.module.scss";

export default function Cart({ cartData, priceData }: any) {
  const router = useRouter();

  const [cartList, setCartList] = useState<any>(cartData);
  const [totalPrice, setTotalPrice] = useState<{
    price: number;
    delivery: number;
  }>(priceData);

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  // isChecked 속성 넣기
  const addPropIsChecked = (list: any) => {
    const addPropMap = list.map((val: any) => {
      return { ...val, isChecked: false };
    });

    setCartList(addPropMap);
  };

  // 수량 변경 이벤트
  const onClickUpdateCount = async (
    index: number,
    count: number,
    info: any
  ) => {
    if (count === 0) alert("수량이 부족합니다 (최소 1개)");
    else {
      updateCountAction(count, info).then(() => {
        const copy = [...cartList];

        copy[index] = {
          ...copy[index],
          cart_info: { ...copy[index].cart_info, count },
        };

        setCartList(copy);
      });
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

  const itemRemove = async (items: any) => {
    const isConfirm = confirm("장바구니에서 제외 하시겠습니까?");

    if (isConfirm) return itemRemoveAction(items);
  };

  const onClickItemRemove = (index: number) => {
    const items = [{ ...cartList[index].cart_info }];

    itemRemove(items)?.then(() => {
      const filter = cartList.filter((val: any, idx: number) => idx !== index);
      setCartList(filter);
    });
  };

  const onClickSelectedRemove = () => {
    const checkedFilter = cartList.filter((val: any) => val.isChecked);
    if (checkedFilter.length === 0) {
      return alert("선택한 상품이 없습니다.");
    }

    const unCheckedFilter = cartList.filter((val: any) => !val.isChecked);
    const items = checkedFilter.map((val: any) => {
      return { ...val.cart_info };
    });

    itemRemove(items)?.then(() => {
      setCartList(unCheckedFilter);
    });
  };

  const createOrder = async (data: any) => {
    const orderId = await createOrderAction(data);
    router.push(`/order?order_id=${orderId}`);
  };

  const onClickProductOrder = (index: number) => {
    const orderData = [cartList[index]];
    createOrder(orderData);
  };

  const onClickAllProductOrder = () => {
    createOrder(cartList);
  };

  const onClickSelectedProductOrder = () => {
    const orderData = cartList.filter((val: any) => val.isChecked);
    if (orderData.length === 0) {
      alert("선택한 상품이 없습니다.");
    } else createOrder(orderData);
  };

  useEffect(() => {
    const priceData = getTotalPrice(cartList);
    setTotalPrice(priceData);
  }, [cartList]);

  useEffect(() => {
    addPropIsChecked(cartData);
  }, [cartData]);

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
              <div className={cartStyles.item_check_remove}>
                <button onClick={onClickAllChecked}>전체선택</button>
                <button onClick={onClickSelectedRemove}>선택삭제</button>
              </div>
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
