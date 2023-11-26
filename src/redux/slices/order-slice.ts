import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NORMA_API } from "../../utils/burger-api";
import { IOrder } from "../../utils/types";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async function ({
    constructorBunId,
    constructorIngredientsIds,
    hidePreloader,
    removeIngredients,
  }: {
    constructorBunId: string;
    constructorIngredientsIds: string[];
    hidePreloader: () => void;
    removeIngredients: () => void;
  }) {
    const response = await fetch(`${NORMA_API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: [
          constructorBunId,
          ...constructorIngredientsIds,
          constructorBunId,
        ],
      }),
    });
    await hidePreloader();
    const data = await response.json();
    if (data) removeIngredients();
    return data;
  }
);

const initialState: IOrder = {
  name: "",
  order: {
    number: 0,
  },
  modalVisible: false,
  error: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.modalVisible = true;
      state.error = false;
      state.name = action.payload.name;
      state.order.number = action.payload.order.number;
    });

    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export const { setModalVisible } = orderSlice.actions;

export default orderSlice.reducer;
