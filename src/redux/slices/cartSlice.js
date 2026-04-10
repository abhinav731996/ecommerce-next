import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (i) => i.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    // ✅ REMOVE FROM CART
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // ✅ INCREASE QTY
    increaseQty: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ DECREASE QTY
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(
        (i) => i.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ✅ CLEAR CART (IMPORTANT FOR ORDER)
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;