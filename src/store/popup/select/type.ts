export interface ITaskFormArrays {
  products: number[];
  points: number[];
  floors: IFloor[];
}

export interface IFloor {
  zoneId: number;
  sectionId: number;
  blockId: number;
  floorId: number;
}
