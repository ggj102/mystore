import { addCart, removeCart, updateCart } from "@/src/application/useCaseCart";
import { CartItemType } from "@/src/domain/cart";
import { createAction, createReducer } from "@reduxjs/toolkit";

interface InitialStateType {
  carList: CartItemType[];
}
export const initCartAction = createAction("cart/initCartAction");
export const addCartAction = createAction<CartItemType>("cart/addCartAction");
export const removeCartAction = createAction<number>("cart/removeCartAction");

const initialState: InitialStateType = { carList: [] };

export const cartReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(initCartAction, (state)=>{
    const data = localStorage.getItem("cartList");
    if (data) {
      const list = JSON.parse(data);
      updateCart(list);
      state.carList = list;
    }
  }

  )
  .addCase(addCartAction, (state, action) => {
    const cartList = addCart(action.payload);
    localStorage.setItem("cartList", JSON.stringify(cartList));

    state.carList = cartList;
  }).addCase(removeCartAction, (state, action) => {  
    const cartList = removeCart(action.payload);
    localStorage.setItem("cartList", JSON.stringify(cartList));

    state.carList = cartList
    
  });
});
