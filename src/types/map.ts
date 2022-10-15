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
	columnsNumber: number;
	rows: Array<ISectionFloor>;
}

export interface ISectionFloor {
	id: number;
	number: number;
	isHeadRow: boolean;
}

export interface ISectionFloorComponent extends ISectionFloor {
	columnsNumber: number;
}

export interface ISectionHeadFloor {
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
