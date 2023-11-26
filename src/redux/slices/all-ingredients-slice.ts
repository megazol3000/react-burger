import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NORMA_API } from "../../utils/burger-api";
import { IIngredient } from "../../utils/types";

interface IInitialState {
  ingredients: Array<IIngredient | undefined>;
  error: boolean;
}

const initialState: IInitialState = {
  ingredients: [],
  error: false,
};

export const fetchAllIngredients = createAsyncThunk(
  "allIngredients/fetchAllIngredients",
  async function () {
    const response = await fetch(`${NORMA_API}/ingredients`);
    const data = await response.json();
    return data;
  }
);

export const allIngredientsSlice = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.data;
      state.error = false;
    });

    builder.addCase(fetchAllIngredients.rejected, (state) => {
      state.error = true;
    });
  },
});

export const { setIngredients, setError } = allIngredientsSlice.actions;

export default allIngredientsSlice.reducer;
