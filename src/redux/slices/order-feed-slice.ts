import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  isPageOpened: false,
  isLoading: true,
  orders: [],
  currentOrder: {}
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
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
  },
});

export const { setOrderFeedPageOpened, setOrders, setCurrentOrder } = orderFeedSlice.actions;

export default orderFeedSlice.reducer;
