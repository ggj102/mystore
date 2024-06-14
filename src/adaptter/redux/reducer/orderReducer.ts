import { createAction, createReducer } from "@reduxjs/toolkit";

interface InitialStateType {
  orderList: any;
}
export const updateOrderAction = createAction<any>("order/updateOrderAction");

const initialState: InitialStateType = { orderList: [] };

export const orderReducer = createReducer(initialState, (builder) => {
  builder.addCase(updateOrderAction, (state, action) => {
    state.orderList = action.payload;
  });
});
