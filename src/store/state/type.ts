export interface ICheckMark {
  label: string;
  value: boolean;
  mark: TMarkType;
}

export type TMarkType = 'interface' | 'products' | 'tasks';

export interface IUserData {
  isAuth: boolean;
  id: number;
  login: string;
  name: string;
  role: TUserRole;
}

export type TUserRole = 'worker' | 'operator' | 'admin';
