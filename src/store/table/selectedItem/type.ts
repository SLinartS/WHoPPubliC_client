import { TTaskType } from '../../type';

export type TSelectedItems = {
  tasks: {
    [key in TTaskType]: number;
  };
  products: {
    [key in TSelectedProducts]: number;
  };
  users: {
    [key in TSelectedUsers]: number;
  };
};

export type TSelectedProducts = 'products';

export type TSelectedUsers = 'users';
