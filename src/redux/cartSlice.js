import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../cartItems";

const initialState = {
  cartItems,
  amount: cartItems.reduce((total, item) => total + item.amount, 0),
  total: cartItems.reduce((total, item) => total + (item.price * item.amount), 0),
  isLoading: true
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, payload) => {
    //   state.cartItems = [...state.cartItems, payload];
    // },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const removedItem = state.cartItems.find(item => item.id === itemId);
      state.amount = state.amount - removedItem.amount;
      state.total = state.total - (removedItem.price * removedItem.amount);
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
      state.amount = state.amount + 1;
      const itemPrice = parseFloat(cartItem.price);
      state.total = state.total + itemPrice;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload);
      if (cartItem.amount > 0) {
        cartItem.amount = cartItem.amount - 1;
        state.amount = state.amount - 1;
        const itemPrice = parseFloat(cartItem.price);
        state.total = state.total - itemPrice;
      }
    }
  }
})

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;