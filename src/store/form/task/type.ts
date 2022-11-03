export interface ITaskFormDataArrays {
  products: number[];
  points: number[];
  warehousePoints: IWarehousePoint[];
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
