import { TValueOrErrorType } from '@store/type';

export interface IAuthorizationData {
  login: TValueOrErrorType;
  password: TValueOrErrorType;
}

export interface IUser {
  id: number;
  login: string;
  name: string;
  token: string;
  role: TUserRole;
  roleAlias: string;
}

export type TUserRole = null | 'worker' | 'operator' | 'admin';

export interface IRequestLoginData {
  login: string;
  password: string;
}
