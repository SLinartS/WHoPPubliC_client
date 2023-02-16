import { TValueOrErrorType } from '@store/type';

export interface IAuthorizationData {
  login: TValueOrErrorType;
  password: TValueOrErrorType;
}

export interface IUserData {
  id: number;
  login: string;
  name: string;
  role: TUserRole;
  roleAlias: string;
}

export interface ITokens {
  access: string;
  refresh: string;
}

export interface IResponseUserData {
  userData: IUserData;
  tokens: ITokens;
}

export type TUserRole = '' | 'worker' | 'operator' | 'admin';

export interface IRequestLoginData {
  login: string;
  password: string;
}

export interface IRequestLogoutData {
  userId: number;
}
