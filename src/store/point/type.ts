export interface IPoints {
  acceptance: Array<IPoint>;
  shipment: Array<IPoint>;
}

export interface IPoint {
  id: number;
  title: string;
  active: boolean;
}
