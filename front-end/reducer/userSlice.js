import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
  },
  reducers: {
    login: (state) => {
      state.isLogged = true;
      return state;
    },
    logout: (state) => {
      state.isLogged = false;
      return state;
    },
  },
});

export const { login, logout } = userSlice.actions;
