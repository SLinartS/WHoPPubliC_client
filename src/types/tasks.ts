export interface ITasksList {
	data: TTasks;
	tableHeader: Array<string>;
}

export type TTasks = Array<ITask>;

export interface ITask {
	id: number;
	title: string;
	deadlines: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
}

export type IAcceptanceTasksOne = {
	data: TAcceptanceTasksOne;
};

export type IShipmentTasksOne = {
	data: TShipmentTasksOne;
};

export type TAcceptanceTasksOne = Array<IAcceptanceTaskOne>;
export type TShipmentTasksOne = Array<IShipmentTaskOne>;

interface IAcceptanceTaskOne {
	id: number;
	title: string;
	deadlines: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
	productIds: Array<number>;
	startPointIds: Array<number>;
	endPointsIds: Array<string>;
}

interface IShipmentTaskOne {
	id: number;
	title: string;
	deadlines: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
	productIds: Array<number>;
	startPointIds: Array<string>;
	endPointsIds: Array<number>;
}
