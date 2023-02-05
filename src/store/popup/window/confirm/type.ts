import {
  TSelectedAccounts,
  TSelectedItems,
  TSelectedProducts,
} from '../../../table/selectedItem/type';
import { TTaskType } from '../../../type';

export interface IWindowsConfirm {
  variant: TWindowsConfirmVariants;
  text: string;
  itemId: number;
  itemType: keyof TSelectedItems;
  itemName: TTaskType | TSelectedProducts | TSelectedAccounts;
}

export type TWindowsConfirmVariants =
  | 'deleteTask'
  | 'deleteRelatedProducts'
  | 'deleteProduct'
  | 'deleteAccount';
