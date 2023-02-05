import { TTaskType } from '../../type';

export type TSelectedItems = {
  tasks: {
    [key in TTaskType]: number;
  };
  products: {
    [key in TSelectedProducts]: number;
  };
  accounts: {
    [key in TSelectedAccounts]: number;
  };
};

export type TSelectedProducts = 'products';

export type TSelectedAccounts = 'accounts';
