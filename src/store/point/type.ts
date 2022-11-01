export interface TPoints {
  acceptance: Array<IPoint>;
  shipment: Array<IPoint>;
}

export interface IPoint {
  id: number;
  title: string;
  isAcceptance: boolean;
}
