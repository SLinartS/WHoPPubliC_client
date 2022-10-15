export interface IMapZoneLetter {
  fontSize: number;
	topOffset: number;
	leftOffset: number;
}

export interface IMapTableData {
	zoneLetter: string;
	rows: Array<IMapRowData>;
}

export interface IMapRowData {
	number: number;
	isHeadRow: boolean;
	columnsNumber: number;
}

export interface IMapHeadRowData {
	number: number;
}
