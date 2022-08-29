import { createSlice } from '@reduxjs/toolkit';
import { ICartItem, IDataItem } from '../../pages/Home/type';

export interface ICartSlice {
  cartItems: IDataItem[];
  total: number;
}

const initialState: ICartSlice = {
  cartItems: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state: any, { payload }) => {
      const cartItemIndex = state.cartItems.findIndex(
        (cartItem: any) => cartItem.name === payload.name
      );
      if (cartItemIndex > -1) {
        state.cartItems[cartItemIndex].amount += 1;
      } else {
        state.cartItems.push({ ...payload, amount: 1 });
      }
    },
    removeItem: (state: any, { payload: index }) => {
      if (state.cartItems[index].amount === 1) {
        state.cartItems.splice(index, 1);
      } else {
        state.cartItems[index].amount -= 1;
      }
    },
    calculateTotals: (state: any) => {
      let total = 0;
      if (state.cartItems.length) {
        total = state.cartItems
          .map((cartItem: ICartItem) => {
            return cartItem.price * cartItem.amount;
          })
          .reduce(
            (total: number, carItemPrice: number) => total + carItemPrice
          );
      }
      state.total = total === 0 ? total.toFixed(2) : Number(total.toFixed(2));
    },
  },
});

export const { addItem, calculateTotals, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
