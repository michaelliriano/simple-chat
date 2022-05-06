import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface ThemeControlState {
  id?: String;
  username?: String;
  room?: String;
  rooms: Array<string>;
  error: string | null;
}

const initialState: ThemeControlState = {
  id: localStorage.getItem('id') || '',
  username: localStorage.getItem('username') || '',
  room: localStorage.getItem('room') || '',
  rooms: localStorage.getItem('rooms')
    ? JSON.parse(localStorage.getItem('rooms') || '')
    : [],
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.id = action.payload;
    },
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('id', action.payload.id);
    },
    setRoom: (state, action) => {
      state.room = action.payload;
      if (!state.rooms.includes(action.payload)) {
        state.rooms = [...state.rooms, action.payload];
      }
      state.error = '';
      localStorage.setItem('room', action.payload);
      localStorage.setItem('rooms', JSON.stringify(state.rooms));
    },
    addRoom: (state, action) => {
      state.rooms = [...state.rooms, action.payload];
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.username = '';
      state.room = '';
      localStorage.removeItem('room');
      localStorage.removeItem('rooms');
      localStorage.removeItem('id');
      localStorage.removeItem('username');
    },
    removeRoom: (state, action) => {
      const rooms = [...state.rooms];
      const index = rooms.indexOf(action.payload);
      rooms.splice(index, 1);
      state.rooms = rooms;
      state.room = rooms[rooms.length - 1];
      localStorage.setItem('rooms', JSON.stringify(state.rooms));
      localStorage.setItem('room', rooms[0]);
    },
    reset: (state) => {
      state.room = '';
      state.rooms = [];
      state.id = '';
      state.username = '';
      localStorage.removeItem('room');
      localStorage.removeItem('rooms');
      localStorage.removeItem('username');
      localStorage.removeItem('id');
    },
  },
});

export const { setUser, setRoom, removeRoom, setError, reset, setSocket } =
  userSlice.actions;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
