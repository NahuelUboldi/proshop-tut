//user login request
//user login success
//user login fail
//user logout

import { createSlice } from '@reduxjs/toolkit';

const localStorageItems = localStorage.getItem('userInfo');
const userInfo = localStorageItems ? JSON.parse(localStorageItems) : [];

const initialState = {
  // loading: false,
  // userInfo,
  // error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      console.log('user login request');
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      console.log('user login success');
      state.loading = false;
      state.userInfo = [...action.payload];
    },
    userLoginFail: (state, action) => {
      console.log('user login fail');
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state, action) => {
      console.log('user logout');
      state = {};
    },
  },
});

export const { userLoginRequest, userLoginSuccess, userLoginFail } =
  userSlice.actions;

export default userSlice.reducer;
