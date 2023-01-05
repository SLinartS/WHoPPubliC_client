export interface ICheckMark {
  [lable: string]: {
    value: boolean;
    mark: TMarkType;
  };
}

export type TMarkType = 'interface' | 'products' | 'tasks';
