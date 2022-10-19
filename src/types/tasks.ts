export type TAcceptanceTasks = Array<ITask>;

// in the future, the realization of acceptance and shipments may need to be different
export type TShipmentTasks = Array<ITask>;

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
