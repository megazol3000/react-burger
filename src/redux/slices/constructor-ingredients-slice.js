import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bun: '',
  ingredients: [],
};

export const constructorIngredientsSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload.id);
    },
    addBun: (state, action) => {
      state.bun = action.payload.id;
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item, idx) => idx !== action.payload);
    },
    moveIngredient: (state, action) => {
      let sortedArr = [...state.ingredients];
      const dragIdx = action.payload.dragIdx;
      const hoverIdx = action.payload.hoverIdx;
      const ingredients = state.ingredients[dragIdx];

      sortedArr.splice(dragIdx, 1);
      sortedArr.splice(hoverIdx, 0, ingredients);

      state.ingredients = sortedArr;
    },
    removeAllIngredients: (state) => {
      state.bun = '';
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, addBun, moveIngredient, removeAllIngredients } = constructorIngredientsSlice.actions;

export default constructorIngredientsSlice.reducer;