import { createSlice } from '@reduxjs/toolkit';
import { itemTypes } from '../../pages/Home/type';

export interface ITabSlice {
  tabSelect: string;
}

const initialState: ITabSlice = {
  tabSelect: itemTypes.mug,
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    changeTab: (state: any, { payload: type }) => {
      state.tabSelect = type;
    },
  },
});

export const { changeTab } = tabSlice.actions;

export default tabSlice.reducer;
