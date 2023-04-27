import { IOption } from '@store/category/type';

export interface IOptionType extends IOption {
  alias: string;
}

export type TProductTypes = 'book' | 'magazine' | 'other';
