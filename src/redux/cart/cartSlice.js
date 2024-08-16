import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        existingItem.quantity += 1;
        toast.success(
          `${existingItem.quantity}  ${action.payload.title} added to cart!`
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
        toast.success(`${action.payload.title} added to cart!`);
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
    },
    reduceItemQuantity: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === itemId);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item._id !== itemId
          );
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemTotal = (state, itemId) => {
  const item = state.cart.cartItems.find((i) => i._id === itemId);
  return item ? item.quantity * item.price : 0;
};

export const selectCartTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

export const {
  addItemToCart,
  removeItemFromCart,
  reduceItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
