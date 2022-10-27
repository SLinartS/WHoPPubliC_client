// Components Data
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

// Headers
export interface IBlockProps extends IBlock{
	index: number;
}

export interface IHeaderBlockProps {
	floors: Array<IFloor>;
}

export interface IFloorProps extends Omit<IFloor, 'id'> {
	id?: number;
	index: number;
}

export interface IHeaderFloorProps {
	index: number;
}

// Info Blocks Data

export interface IInfoElementProps {
	fontSize: number;
}
export interface IZoneLetterProps extends IInfoElementProps {
	zoneLetter: string;
}

