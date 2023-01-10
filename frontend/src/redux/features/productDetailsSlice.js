import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductDetails = createAsyncThunk(
  'productDetails/getProductDetails',
  ({ id }) => {
    console.log('fetchid: ', id);
    const url = `http://localhost:5000/api/products/${id}`;
    return axios.get(url).then((res) => res.data);
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    loading: false,
    product: [],
    status: '',
    error: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.status = 'Fetching todos. Please wait a moment...';
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.status = 'Products fetched succesfully';
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.status = 'Failed to fetch data...';
        state.products = [];
        state.error = action.error.message;
      });
  },
});
console.log(productDetailsSlice);

export default productDetailsSlice.reducer;
