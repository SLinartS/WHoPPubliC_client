import { IField } from '@store/type';

/* It is inherited by other interfaces of objects
 so that these objects can be used in the table. */
export interface ITableObject {
  [key: string]: IField<string | number>;
  id: IField<number>;
}
