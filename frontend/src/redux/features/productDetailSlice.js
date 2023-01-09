import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'productList/getProducts',
  ({ id }) => {
    console.log(id);
    return axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.data);
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    loading: false,
    product: [],
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
        state.products = action.payload;
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
console.log(productDetailSlice);

export default productDetailSlice.reducer;
