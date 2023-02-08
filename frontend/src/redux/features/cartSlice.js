import { createSlice } from '@reduxjs/toolkit';

const localStorageItems = localStorage.getItem('cartItems');
const items = localStorageItems ? JSON.parse(localStorageItems) : [];

const initialState = {
  cartItems: items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (!existingItem) {
        state.cartItems.push({ ...newItem });
      } else {
        existingItem.qty = action.payload.qty;
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    removeCartItem: (state, action) => {
      const itemToRemove = action.payload;
      const filteredItems = state.cartItems.filter(
        (item) => item.product !== itemToRemove
      );
      state.cartItems = filteredItems;
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
