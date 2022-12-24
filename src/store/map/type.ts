export interface IZone {
  id: number;
  zoneLetter: string;
  number: number;
  sections: ISection[];
}

export interface ISection {
  id: number;
  number: number;
  blocks: IBlock[];
}

export interface IBlock {
  id: number;
  number: number;
  floors: IFloor[];
}

export interface IFloor {
  id: number;
  number: number;
  capacity: number;
  freeSpace: number;
}
