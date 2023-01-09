import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListSlice';
import productDetailReducer from './features/productDetailSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetail: productDetailReducer,
  },
});
