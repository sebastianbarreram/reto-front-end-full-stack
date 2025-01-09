import UserReducer from '../slices/UserSlice';
import TasksReducer from '../slices/TasksSlice';
import { configureStore } from '@reduxjs/toolkit';

export const ConfigStorage = configureStore({
  reducer: {
    user: UserReducer,
    tasks: TasksReducer,
  },
});

export type AppDispatch = typeof ConfigStorage.dispatch;
export type RootState = ReturnType<typeof ConfigStorage.getState>;
