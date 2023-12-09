import { configureStore } from "@reduxjs/toolkit";
import allIngredientsSlice from "./slices/all-ingredients-slice";
import currentIngredientSlice from "./slices/current-ingredient-slice";
import constructorIngredientsSlice from "./slices/constructor-ingredients-slice";
import orderSlice from "./slices/order-slice";
import userSlice from "./slices/user-slice";
import preloaderSlice from "./slices/preloader-slice";
import { IState } from "../utils/types";

export const store = configureStore<IState>({
  reducer: {
    allIngredients: allIngredientsSlice,
    currentIngredient: currentIngredientSlice,
    constructorIngredients: constructorIngredientsSlice,
    order: orderSlice,
    user: userSlice,
    preloader: preloaderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
