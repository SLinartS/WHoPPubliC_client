export type TLocation = 'acceptancePoint' | 'shipmentPoint' | 'floors';

export interface ILocationButtons {
  [label: string]: {
    first: {
      type: TLocation;
      text: string;
    };
    second: {
      type: TLocation;
      text: string;
    };
  };
}
