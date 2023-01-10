import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk('productList/getProducts', () => {
  return axios
    .get('http://localhost:5000/api/products')
    .then((res) => res.data);
});

const productsListSlice = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    products: [],
    status: '',
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.status = 'Fetching todos. Please wait a moment...';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = [...action.payload];
        state.loading = false;
        state.status = 'Products fetched succesfully';
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.status = 'Failed to fetch data...';
        state.products = [];
        state.error = action.error.message;
      });
  },
});
console.log(productsListSlice);

export default productsListSlice.reducer;
