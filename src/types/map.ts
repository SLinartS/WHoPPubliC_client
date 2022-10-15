export interface IMapZoneLetter {
	fontSize: number;
	topOffset: number;
	leftOffset: number;
}

export interface IMapSectionLetter {
	topOffset: number;
	rightOffset: number;
}

export interface IMapTable {
	columnsNumber: number;
	zoneLetter: string;
	rows: Array<IMapRow>;
}

export interface IMapRow {
	number: number;
	isHeadRow: boolean;
}

export interface IMapRowComponent extends IMapRow {
	columnsNumber: number;
}

export interface IMapHeadRow {
	number: number;
}
