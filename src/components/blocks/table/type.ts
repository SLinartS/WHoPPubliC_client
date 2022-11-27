/* It is inherited by other interfaces of objects
 so that these objects can be used in the table. */
export interface ITableObject {
  [index: string]: string | number;
  id: number;
}
