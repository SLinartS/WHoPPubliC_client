export interface TAcceptanceTasks {
	data: TTasks;
	tableHeader: Array<string>;
}

// in the future, the realization of acceptance and shipments may need to be different
export interface TShipmentTasks {
	data: TTasks;
	tableHeader: Array<string>;
}

export type TTasks = Array<ITask>;

export interface ITask {
	id: string;
	deadlines: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
}

export interface ITaskProps extends ITask {
	number: number;
}
