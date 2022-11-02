export interface ITaskFormDataArrays {
  products: Array<number>;
  points: Array<number>;
  warehousePoints: Array<IWarehousePoint>;
}

export interface IWarehousePoint {
  zoneId: number;
  sectionId: number;
  blockId: number;
  floorId: number;
}

export interface ITaskFormDataFields {
  article: string;
  dateStart: string;
  dateEnd: string;
}
