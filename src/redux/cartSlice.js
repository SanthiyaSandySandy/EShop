import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        if (state.items[itemIndex].quantity > 1) {
          state.items[itemIndex].quantity -= 1; // ✅ Reduce quantity by 1
        } else {
          state.items = state.items.filter((item) => item.id !== action.payload); // ✅ Remove when quantity reaches 0
        }
      }
    },
    clearCart: (state, action) => {
      state.items = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;