"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "@/src/adaptter/redux/hooks";
import { priceFormatter } from "@/utils/priceFormatter";

import ViewInUp from "@/components/animation/viewInUp";
import CartItem from "./cartItem";
import CartGuide from "./cartGuide";

import cartStyles from "@styles/pages/cart.module.scss";
import { updateOrderAction } from "@/src/adaptter/redux/reducer/orderReducer";
import { useRouter } from "next/navigation";
import { getTotalPrice } from "@/utils/getTotalPrice";

export default function Cart() {
  const router = useRouter();
  const userData = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [cartList, setCartList] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState<{
    price: number;
    delivery: number;
  }>({
    price: 0,
    delivery: 0,
  });

  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  // isChecked 속성 넣기
  const addPropIsChecked = (list: any) => {
    const addPropMap = list.map((val: any) => {
      return { ...val, isChecked: false };
    });

    setCartList(addPropMap);
  };

  // 수량 변경 이벤트
  const onClickUpdateCount = (index: number, count: number, info: any) => {
    axios.put("http://localhost:3005/cart", { ...info, count }).then(() => {
      const copy = [...cartList];

      copy[index] = {
        ...copy[index],
        cart_info: { ...copy[index].cart_info, count },
      };

      setCartList(copy);
    });
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
  const itemRemove = (items: any) => {
    const isConfirm = confirm("장바구니에서 제외 하시겠습니까?");

    if (isConfirm) {
      return axios.delete("http://localhost:3005/cart", { data: items });
    }
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

  const dispatchOrder = (data: any) => {
    dispatch(updateOrderAction(data));
    router.push("/order");
  };

  const onClickProductOrder = (index: number) => {
    const orderData = [cartList[index]];
    dispatchOrder(orderData);
  };

  const onClickAllProductOrder = () => {
    dispatchOrder(cartList);
  };

  const onClickSelectedProductOrder = () => {
    const orderData = cartList.filter((val: any) => val.isChecked);
    dispatchOrder(orderData);
  };

  useEffect(() => {
    const priceData = getTotalPrice(cartList);
    setTotalPrice(priceData);
  }, [cartList]);

  useEffect(() => {
    if (userData.id) {
      axios.get(`http://localhost:3005/cart?id=${userData.id}`).then((res) => {
        console.log(res.data, "데이터");
        addPropIsChecked(res.data);
      });
    }
  }, [userData]);

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
