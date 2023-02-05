import { ITableObject } from '@components/table/type';
import { IAccountFormDataFields } from '@store/popup/form/account/type';
import { IField } from '@store/type';

export interface IAccount extends ITableObject {
  id: IField<number>;
  email: IField<string>;
  phone: IField<string>;
  name: IField<string>;
  surname: IField<string>;
  patronymic: IField<string>;
  roleAlias: IField<string>;
  roleId: IField<number>;
}

export interface IRequestAccountData {
  fields: IAccountFormDataFields;
}

export interface IResponseAccountDelete {
  message: string;
}
