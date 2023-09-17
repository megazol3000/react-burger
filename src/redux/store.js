import { configureStore } from '@reduxjs/toolkit';
import allIngredientsSlice from './slices/all-ingredients-slice';
import currentIngredientSlice from './slices/current-ingredient-slice';
import constructorIngredientsSlice from './slices/constructor-ingredients-slice';
import orderSlice from './slices/order-slice';
import userSlice from './slices/user-slice';

export const store = configureStore({
  reducer: {
    allIngredients: allIngredientsSlice,
    currentIngredient: currentIngredientSlice,
    constructorIngredients: constructorIngredientsSlice,
    order: orderSlice,
    user: userSlice,
  },
});