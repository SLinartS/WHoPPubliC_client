// Components Data
export interface IMap {
	zones: Array<IZone>;
}

export interface IZone {
	id: number;
	zoneLetter: string;
	sections: Array<ISection>;
}

export interface ISection {
	id: number;
	floorsNumber: number;
	blocks: Array<IBlock>;
}

export interface IBlock {
	id: number;
}

export interface IBlockComponent extends IBlock {
	floorsNumber: number;
}

export interface IHeaderBlock {
	floorsNumber: number;
}

export interface IHeaderFloor {
	number: number;
}

// Info Blocks Data

export interface IZoneLetter {
	fontSize: number;
	topOffset: number;
	leftOffset: number;
}

export interface IZoneLetterComponent extends IZoneLetter {
	zoneLetter: string;
}

export interface ISectionNumber {
  fontSize: number;
	topOffset: number;
	rightOffset: number;
}
