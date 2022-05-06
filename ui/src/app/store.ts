import { configureStore } from '@reduxjs/toolkit';
import themeControlSlice from '../features/themeControl/themeControlSlice';
import userSlice from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    themeControlSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
