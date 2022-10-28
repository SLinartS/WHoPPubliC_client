export type TMap = Array<IZone>;

export interface IZone {
	id: number;
	zoneLetter: string;
	number: number;
	sections: Array<ISection>;
}

export interface ISection {
	id: number;
	number: number;
	blocks: Array<IBlock>;
}

export interface IBlock {
	id: number;
	number: number;
	floors: Array<IFloor>;
}

export interface IFloor {
	id: number;
	number: number;
}
