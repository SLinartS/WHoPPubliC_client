import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TStatus } from '../types/store';
import { ITasksList } from '../types/tasks';

import { AxiosResponse } from 'axios';
import extendAxios from '../utils/extendAxios';

export class TasksStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TStatus = 'pending';
	public tasksAccepranceList: ITasksList = { data: [], tableHeader: [] };
	public tasksShipmentList: ITasksList = { data: [], tableHeader: [] };

	public *getAcceptanceTasks() {
		try {
			console.log('request to the server...', '| TasksAcceptance');
			const response: AxiosResponse<ITasksList> = yield extendAxios.get<ITasksList>(
				'tasks/acceptance',
			);
			this.tasksAccepranceList = response.data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}

	public *getShipmentTasks() {
		try {
			console.log('request to the server...', '| TasksShipment');
			const response: AxiosResponse<ITasksList> = yield extendAxios.get<ITasksList>(
				'tasks/shipment',
			);
			this.tasksShipmentList = response.data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}

	// public *deleteAcceptanceTask(id: number) {
	// 	try {
	// 		console.log('request to the server...', '| DELETE Task Acceptance');
	// 		yield deleteFakeAcceptanceTask(id);
	// 		this.status = 'pending';
	// 		this.getAcceptanceTasks();
	// 	} catch (error) {
	// 		this.status = 'error';
	// 	}
	// }
}
