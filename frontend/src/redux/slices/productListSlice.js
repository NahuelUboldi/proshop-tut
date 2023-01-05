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
    [getProducts.fulfilled]: (state, action) => {
      let updatedProductList = state.products.concat(action.payload);
      state.products = updatedProductList;
      state.loading = false;
      state.status = 'Products fetched succesfully';
    },
    [getProducts.pending]: (state) => {
      state.loading = true;
      state.status = 'Fetching todos. Please wait a moment...';
    },
    [getProducts.rejected]: (state) => {
      state.loading = false;
      state.status = 'Failed to fetch data...';
    },
  },
});

export default productsListSlice.reducer;
