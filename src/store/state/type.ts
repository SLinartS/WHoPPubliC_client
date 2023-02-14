export interface ICheckMark {
  label: string;
  value: boolean;
  type: TMarkType;
}

export type TMarkType = 'interface' | 'products' | 'tasks' | 'users';
