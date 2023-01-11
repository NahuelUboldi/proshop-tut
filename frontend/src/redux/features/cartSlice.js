import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCartItems = createAsyncThunk('cart/getCartItems', (id) => {
  const url = `http://localhost:5000/api/products/${id}`;
  return axios.get(url).then((res) => res.data);
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: false,
    cartItems: [],
    status: '',
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.status = 'Fetching products. Please wait a moment...';
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.product = action.payload;
        state.loading = false;
        state.status = 'Products fetched succesfully';
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.status = 'Failed to fetch data...';
        state.product = [];
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
