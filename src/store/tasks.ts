import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TypeStatus } from '../types/store';
import { TAcceptanceTasks, TShipmentTasks } from '../types/tasks';

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
	public tasksAccepranceList: TAcceptanceTasks = [];
	public tasksShipmentList: TShipmentTasks = [];

	public *getAcceptanceTasks() {
		try {
			console.log('request to the server...', '| TasksAcceptance');
			const data: TAcceptanceTasks = yield getFakeAcceptanceTasks();
			this.tasksAccepranceList = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}

	public *getShipmentTasks() {
		try {
			console.log('request to the server...', '| TasksShipment');
			const data: TAcceptanceTasks = yield getFakeShipmentTasks();
			this.tasksShipmentList = data;
			this.status = 'done';
			
		} catch (error) {
			this.status = 'error';
		}
	}

	public *deleteAcceptanceTask(id: string) {
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
