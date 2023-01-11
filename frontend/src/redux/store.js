import { configureStore, createReducer } from '@reduxjs/toolkit';
import productListReducer from './features/productListSlice';
import productDetailsReducer from './features/productDetailsSlice';
import cartReducer from './features/cartSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});
