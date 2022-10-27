export type TMap = Array<IZone>;

export interface IZone {
	id: number;
	zoneLetter: string;
	sections: Array<ISection>;
}

export interface ISection {
	id: number;
	blocks: Array<IBlock>;
}

export interface IBlock {
	id: number;
	floors: Array<IFloor>;
}

export interface IFloor {
	id: number;
}
