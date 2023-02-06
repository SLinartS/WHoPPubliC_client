export interface ICheckMark {
  label: string;
  value: boolean;
  type: TMarkType;
}

export type TMarkType = 'interface' | 'products' | 'tasks' | 'accounts';

export interface IUser {
  id: number;
  login: string;
  name: string;
  role: TUserRole;
}

export type TUserRole = 'worker' | 'operator' | 'admin';
