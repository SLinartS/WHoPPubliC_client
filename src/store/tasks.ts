import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TypeStatus } from '../types/store';
import { IAcceptanceTasksList, IShipmentTasksList } from '../types/tasks';

import {
	deleteFakeAcceptanceTask,
	getFakeAcceptanceTasks,
	getFakeShipmentTasks,
} from '../fakeAPI/fakeAPI';

export class TasksStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TypeStatus = 'pending';
	public tasksAccepranceList: IAcceptanceTasksList = [];
	public tasksShipmentList: IShipmentTasksList = [];

	public *getAcceptanceTasks() {
		try {
			console.log('request to the server...', '| TasksAcceptance');
			const data: IAcceptanceTasksList = yield getFakeAcceptanceTasks();
			this.tasksAccepranceList = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}

	public *getShipmentTasks() {
		try {
			console.log('request to the server...', '| TasksShipment');
			const data: IAcceptanceTasksList = yield getFakeShipmentTasks();
			this.tasksAccepranceList = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}

	public *deleteTask(id: string) {
		try {
			console.log('request to the server...', '| DELETE Task Acceptance');
			yield deleteFakeAcceptanceTask(id);
			this.status = 'pending';
			this.getAcceptanceTasks();
		} catch (error) {
			this.status = 'error';
		}
	}
}
