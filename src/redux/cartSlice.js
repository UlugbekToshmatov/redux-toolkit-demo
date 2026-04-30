import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true
}

// const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk("cart/getCartItmes", async () => {
  return fetch('/api/react-useReducer-cart-project')
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

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
  },
  extraReducers: (builder) => {
  builder
    .addCase(getCartItems.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getCartItems.fulfilled, (state, action) => {
      const items = Array.isArray(action.payload) ? action.payload : [];

      state.cartItems = items;

      state.amount = items.reduce(
        (total, item) => total + item.amount,
        0
      );

      state.total = items.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );

      state.isLoading = false;
    })
    .addCase(getCartItems.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
    });
}
})

console.log(cartSlice);

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions;
export default cartSlice.reducer;