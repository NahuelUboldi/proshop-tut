import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
  },
});
