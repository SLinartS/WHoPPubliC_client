import { ITableObject } from '@components/table/type';
import { IField } from '@store/type';

export interface IReport extends ITableObject {
  id: IField<number>;
  title: IField<string>;
  typeId: IField<number>;
  typeAlias: IField<string>;
}
