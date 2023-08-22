import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  order: {
    number: 0,
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderName: (state, action) => {
      state.name = action.payload;
    },
    setOrderNumber: (state, action) => {
      state.order.number = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
  },
});

export const { setOrderName, setOrderNumber, setModalVisible } = orderSlice.actions;

export default orderSlice.reducer;