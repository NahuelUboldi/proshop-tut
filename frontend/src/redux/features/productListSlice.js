import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'productList/getProducts',
  async () => {
    let { data } = await axios.get('http://localhost:5000/api/products');
    console.log(data);
    return data;
  }
);

const productsListSlice = createSlice({
  name: 'productList',
  initialState: {
    loading: false,
    products: [],
    status: '',
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      console.log('Pending');
      state.loading = true;
      state.status = 'Fetching todos. Please wait a moment...';
    },
    [getProducts.fulfilled]: (state, action) => {
      console.log('fullfilled');

      state.products = action.payload;
      state.loading = false;
      state.status = 'Products fetched succesfully';
    },
    [getProducts.rejected]: (state) => {
      console.log('rejected');
      state.loading = false;
      state.status = 'Failed to fetch data...';
    },
  },
});
console.log(productsListSlice);

export default productsListSlice.reducer;
