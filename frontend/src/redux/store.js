import { configureStore, createReducer } from '@reduxjs/toolkit';
import productListReducer from './features/productListSlice';
import productDetailsReducer from './features/productDetailsSlice';
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userReducer,
    auth: authReducer,
  },
});
