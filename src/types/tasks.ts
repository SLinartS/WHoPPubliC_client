export interface ITasksList {
	acceptance: Array<ITask>;
	shipments: Array<ITask>;
}

export interface ITasks {
	tasks: Array<ITask>;
}

export interface ITask {
	id: string;
	deadlines: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
}

export interface ITaskComponent extends ITask {
	number: number;
}
