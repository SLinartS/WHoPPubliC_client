import { IFloor } from "../../../../store/map/type";

export interface IFloorProps extends Omit<IFloor, 'id'> {
	id?: number;
	index: number;
}

export interface IHeaderFloorProps {
	index: number;
}
