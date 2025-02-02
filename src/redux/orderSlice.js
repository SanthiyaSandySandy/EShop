import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: []
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: new Date().getTime().toString(),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        date: new Date().toLocaleString()
      };
      state.orders.push(newOrder);
      console.log("Updated Orders in Redux:", state.orders);
    },
    clearOrder: (state, action) => {
      state.orders = [];
    }
  }
});

export const { placeOrder,clearOrder } = orderSlice.actions;
export default orderSlice.reducer;