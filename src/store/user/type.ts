import { ITableObject } from '@components/table/type';
import { IUserFormDataFields } from '@store/popup/form/user/type';
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

export interface IRequestUserData {
  fields: IUserFormDataFields;
}

export interface IResponseUserDelete {
  message: string;
}
