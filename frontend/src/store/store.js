// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/AuthSlice';
import { authApi } from '../features/api/authApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});