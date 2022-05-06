import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface ThemeControlState {
  mode: string | 'dark' | 'light';
}

const initialState: ThemeControlState = {
  mode: localStorage.getItem('theme') || 'dark',
};

export const themeControlSlice = createSlice({
  name: 'themeControl',
  initialState,
  reducers: {
    setDark: (state) => {
      state.mode = 'dark';
      localStorage.setItem('theme', 'dark');
    },
    setLight: (state) => {
      state.mode = 'light';
      localStorage.setItem('theme', 'light');
    },
  },
});

export const { setDark, setLight } = themeControlSlice.actions;

export const selectTheme = (state: RootState) => state.themeControlSlice.mode;

export default themeControlSlice.reducer;
