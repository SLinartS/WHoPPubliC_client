export interface ITaskFormDataArrays {
  products: {
    value: number[];
    errors: string[];
  };
  points: {
    value: number[];
    errors: string[];
  };
  warehousePoints: {
    value: IWarehousePoint[];
    errors: string[];
  };
}

export interface ITaskFormArrays {
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
