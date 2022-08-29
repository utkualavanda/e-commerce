export interface ITag {
  name: string;
  amount: number;
}

export interface ICompany {
  name: string;
  amount: number;
}

export interface ISearch {
  brandName: string;
  tagName: string;
}

export interface IDataItem {
  tags: string[];
  price: number;
  name: string;
  description: string;
  slug: string;
  added: number;
  manufacturer: string;
  itemType: string;
  amount?: number; //used in cartSlice
}

export interface ICartItem extends IDataItem {
  amount: number;
}

export interface IFilter {
  name: string;
  checked: boolean;
}

export interface IResultDatas<T> {
  data: T[];
}

export const itemTypes = {
  mug: 'mug',
  shirt: 'shirt',
};

export const sortTypes = {
  priceLowToHigh: 'price-asc',
  priceHighToLow: 'price-desc',
  newToOld: 'added-desc',
  oldToNew: 'added-asc',
};
