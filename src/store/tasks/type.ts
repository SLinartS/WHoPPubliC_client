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