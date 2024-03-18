import Cart, { CartItemType } from "../domain/cart";

const cart = new Cart();

// redux에 cart의 기본 구조 전달 및 initialState 정의
// add/removeCart는 디스패치를 함

export const addCart = (item: CartItemType) => {
  cart.addCart(item);

  return cart.cartList;
};

export const updateCart = (list: CartItemType[]) => {
  cart.updateCart(list);
};

export const removeCart = (id: number) => {
  cart.removeCart(id);

  return cart.cartList;
};

export const getCart = () => {
  return cart.cartList;
};
