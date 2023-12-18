import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isPageOpened: false,
  isLoading: true,
  orders: [],
};


export const orderFeedSlice = createSlice({
  name: "orderFeed",
  initialState,
  reducers: {
    setOrderFeedPageOpened: (state, action) => {
      state.isPageOpened = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrderFeedPageOpened, setOrders } = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
