import { createSlice } from "@reduxjs/toolkit";
import { IPreloader } from "../../utils/types";

const initialState: IPreloader = {
  loading: false,
};

export const PreloaderSlice = createSlice({
  name: "preloader",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = PreloaderSlice.actions;

export default PreloaderSlice.reducer;
