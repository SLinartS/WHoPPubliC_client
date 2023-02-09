export interface ICheckMark {
  label: string;
  value: boolean;
  type: TMarkType;
}

export type TMarkType = 'interface' | 'products' | 'tasks' | 'users';

export interface IUser {
  id: number;
  login: string;
  name: string;
  role: TUserRole;
  roleAlias: string;
}

export type TUserRole = 'worker' | 'operator' | 'admin';
