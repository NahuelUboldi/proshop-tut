import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: ['cartItem'],
  },
  reducers: {
    addCartItem: (state, action) => {
      // const { id, qty } = action.payload;
      // console.log('action.payload: ', action.payload);
      // console.log({ id, qty });
      // console.log(state.cartItems);

      const itemInCart = state.cartItems.find((item) => {
        console.log({ state: item._id, payload: action.payload.item._id });

        console.log(item._id === action.payload.item._id);
        return item._id === action.payload.item._id;
      });
      if (itemInCart) {
        console.log('increase qty');
      } else {
        state.cartItems.push({ ...action.payload.item, qty: 1 });
      }
    },
    removeCartItem: (state) => {},
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
