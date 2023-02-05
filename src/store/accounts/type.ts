import { ITableObject } from '@components/table/type';
import { IField } from '@store/type';

export interface IAccount extends ITableObject {
  id: IField<number>;
  email: IField<string>;
  phone: IField<string>;
  name: IField<string>;
  surname: IField<string>;
  patronymic: IField<string>;
  roleId: IField<number>;
}
