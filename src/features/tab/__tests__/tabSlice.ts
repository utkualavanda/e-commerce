import { itemTypes } from '../../../pages/Home/type';
import reducer, { ITabSlice, changeTab } from '../tabSlice';

describe('redux tab slice', () => {
  test('change tab value', () => {
    const previousState: ITabSlice = {
      tabSelect: itemTypes.mug,
    };

    expect(reducer(previousState, changeTab(itemTypes.shirt))).toEqual({
      tabSelect: itemTypes.shirt,
    });
  });
});
