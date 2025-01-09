import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../slices/UserSlice';

export const ConfigStorage = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export type AppDispatch = typeof ConfigStorage.dispatch;
export type RootState = ReturnType<typeof ConfigStorage.getState>;
