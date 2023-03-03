import { ITableObject } from '@components/table/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
import { TDayOfWeek } from '@store/popup/select/workSchedules/type';
import { IField } from '@store/type';

export interface IUser extends ITableObject {
  id: IField<number>;
  email: IField<string>;
  phone: IField<string>;
  name: IField<string>;
  surname: IField<string>;
  patronymic: IField<string>;
  roleAlias: IField<string>;
  roleId: IField<number>;
}

export interface IOneUser {
  userInfo: IUser;
  workSchedules: IWorkSchedule[];
}

interface IWorkSchedule {
  id: number;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
}

export interface IRequestUserData {
  fields: TRequestUserFields;
  id: string;
  workSchedules: TRequestUserWorkSchedules;
}

export interface IResponseUserDelete {
  message: string;
}

export type TRequestUserFields = {
  [key in keyof IUserFormDataFields]: string;
};

export type TRequestUserWorkSchedules = {
  [key in TDayOfWeek]: IRequestUserWorkSchedule;
};

export interface IRequestUserWorkSchedule {
  startTime: string;
  endTime: string;
}
