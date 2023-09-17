import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
  error: false
};

export const allIngredientsSlice = createSlice({
  name: 'allIngredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setError: (state) => {
      state.error = true;
    },
  },
});

export const { setIngredients, setError } = allIngredientsSlice.actions;

export default allIngredientsSlice.reducer;