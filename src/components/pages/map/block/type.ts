import { IBlock, IFloor } from "../../../../store/map/type";

export interface IBlockProps extends IBlock {
	index: number;
}

export interface IHeaderBlockProps {
	floors: Array<IFloor>;
}