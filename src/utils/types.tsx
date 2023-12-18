export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IAllIngredients {
  ingredients: IIngredient[];
  error: boolean;
}

export interface ICurrentIngredient extends IIngredient {
  modalVisible: boolean;
}

export interface IOrder {
  name: string;
  order: {
    number: number;
  };
  modalVisible: boolean;
  error: boolean;
}

export interface IConstructorIngredients {
  bun: string;
  ingredients: string[];
}

export interface IUser {
  registrationState: string;
  loginRequestState: string;
  logoutState: string;
  passwordRecoveryState: string;
  passwordResetState: string;
}

export interface IPreloader {
  loading: boolean;
}

export interface IOrderFeed {
  isPageOpened: boolean
}

export interface IState {
  allIngredients: {
    ingredients: IIngredient[];
    error: boolean;
  };
  currentIngredient: ICurrentIngredient;
  constructorIngredients: IConstructorIngredients;
  order: IOrder;
  user: IUser;
  orderFeed: IOrderFeed;
  preloader: IPreloader;
}

export interface IOrderOld {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
export interface IOrderFeedProps {
  success: boolean;
  total: number;
  totalToday: number;
  orders: IOrderOld[]
}