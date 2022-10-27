import { IFloor } from "../../../../store/map/types";

export interface IFloorProps extends Omit<IFloor, 'id'> {
	id?: number;
	index: number;
}

export interface IHeaderFloorProps {
	index: number;
}
