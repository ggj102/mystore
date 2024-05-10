import { createAction, createReducer } from "@reduxjs/toolkit";

interface InitialStateType {
  user: any;
}
export const initUserAction = createAction<any>("user/initUserAction");

const initialState: InitialStateType = { user: [] };

export const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(initUserAction, (state, action) => {
    state.user = action.payload;
  });
});
