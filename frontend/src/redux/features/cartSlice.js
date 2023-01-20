import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: ['cartItem'],
  },
  reducers: {
    addCartItem: (state, action) => {
      // console.log({ state, a: action.payload });
      // const { id, qty } = action.payload;
      // console.log('action.payload: ', action.payload);
      // console.log({ id, qty });
      // console.log(state.cartItems);
      const itemInCart = state.cartItems.find((item) => {
        console.log({ item, a: action.payload._id });
        return item._id === action.payload._id;
      });
      console.log({ itemInCart });
      if (itemInCart) {
        // itemInCart.quantity++;
        console.log('increase qty');
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 });
      }
    },
    removeCartItem: (state) => {},
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
