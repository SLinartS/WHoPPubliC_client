export interface IOption {
  id: number;
  title: string;
}

export interface IOptionCategory extends IOption {
  productType: TProductTypes;
}

export type TProductTypes = 'book' | 'magazine' | 'booklet';
