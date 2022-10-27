import { IBlock, IFloor } from "../../../../store/map/types";

export interface IBlockProps extends IBlock {
	index: number;
}

export interface IHeaderBlockProps {
	floors: Array<IFloor>;
}