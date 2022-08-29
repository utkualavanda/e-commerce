import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import tabReducer from './features/tab/tabSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tab: tabReducer,
  },
});
