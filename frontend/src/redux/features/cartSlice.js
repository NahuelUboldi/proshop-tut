import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    addCartItem: (state, action) => {
      const itemInCart = state.cartItems.find((item) => {
        return item.product === action.payload.product;
      });
      if (itemInCart) {
        console.log('modify item');
        // add qty missing
        return {
          ...state,
          cartItems: state.cartItems.map((x) => {
            if (x.product === itemInCart.product) {
              console.log('if', action.payload);
              const newQty = Number(x.qty) + Number(action.payload.qty);
              return action.payload;
            }
            console.log('else');
            return x;
          }),
        };
      } else {
        console.log('push Item');
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload }],
        };
        // state.cartItems.push({ ...action.payload });
      }
    },
    removeCartItem: (state) => {},
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
