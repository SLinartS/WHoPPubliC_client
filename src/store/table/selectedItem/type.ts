import { TTaskType } from '../../type';

export type TSelectedItems = {
  tasks: {
    [key in TTaskType]: number;
  };
  products: {
    [key in TSelectedProducts]: number;
  };
};

export type TSelectedProducts = 'products';
