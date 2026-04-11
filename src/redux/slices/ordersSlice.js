import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { placeOrder, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;