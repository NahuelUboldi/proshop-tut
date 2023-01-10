import { configureStore } from '@reduxjs/toolkit';
import productListReducer from './features/productListSlice';
import productDetailsReducer from './features/productDetailsSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
});
