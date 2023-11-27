import { createSlice } from '@reduxjs/toolkit';
import { ICurrentIngredient } from '../../utils/types';

const initialState: ICurrentIngredient = {
  modalVisible: false,
  calories: 0,
  carbohydrates: 0,
  fat: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  name: '',
  price: 0,
  proteins: 0,
  type: '',
  __v: 0,
  _id: '',
};

export const currentIngredient = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.calories = action.payload.calories;
      state.carbohydrates = action.payload.carbohydrates;
      state.fat = action.payload.fat;
      state.image = action.payload.image;
      state.image_large = action.payload.image_large;
      state.image_mobile = action.payload.image_mobile;
      state.name = action.payload.name;
      state.price = action.payload.price;
      state.proteins = action.payload.proteins;
      state.type = action.payload.type;
      state.__v = action.payload.__v;
      state._id = action.payload._id;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    }
  },
});

export const { setCurrentIngredient, setModalVisible } = currentIngredient.actions;

export default currentIngredient.reducer;