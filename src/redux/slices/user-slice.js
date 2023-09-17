import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  logined: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogined: (state, action) => {
      state.logined = action.payload;
    },
  },
});

export const { setLogined } = userSlice.actions;

export default userSlice.reducer;