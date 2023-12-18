import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import allIngredientsSlice from "./slices/all-ingredients-slice";
import currentIngredientSlice from "./slices/current-ingredient-slice";
import constructorIngredientsSlice from "./slices/constructor-ingredients-slice";
import orderSlice from "./slices/order-slice";
import userSlice from "./slices/user-slice";
import preloaderSlice from "./slices/preloader-slice";
import orderFeedSlice from "./slices/order-feed-slice";
import { IState } from "../utils/types";
import { wsApi } from "../utils/ws-api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    allIngredients: allIngredientsSlice,
    currentIngredient: currentIngredientSlice,
    constructorIngredients: constructorIngredientsSlice,
    order: orderSlice,
    user: userSlice,
    orderFeed: orderFeedSlice,
    preloader: preloaderSlice,
    [wsApi.reducerPath]: wsApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(wsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
