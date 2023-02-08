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
      const existingItem = state.cartItems.find((item) => {
        console.log({ itemID: item.product, newItemId: newItem.product });
        return item.product === newItem.product;
      });

      if (!existingItem) {
        state.cartItems.push({
          product: newItem.product,
          name: newItem.name,
          image: newItem.image,
          price: newItem.price,
          countInStock: newItem.countInStock,
          qty: newItem.qty,
        });
      } else {
        existingItem.qty = action.payload.qty;
      }
      localStorage.setItem(
        'cartItems',
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    removeCartItem: (state) => {},
  },
});

export const { addCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
