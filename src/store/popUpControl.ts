import { makeAutoObservable } from 'mobx';
import { IAddTaskWindow, TTypesAddTaskWindow } from '../types/store';

import RootStore from './root';

export class PopUpControlStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public addProduct: boolean = false;
	public addTask: IAddTaskWindow = {
		status: true,
		type: 'acceptance',
	};
	// public addShipmentTask: boolean = false;

	showAddProductWindow() {
		this.addProduct = true;
	}
	hideAddProductWindow() {
		this.addProduct = false;
	}

	showAddTaskWindow(type: TTypesAddTaskWindow) {
		this.addTask.type = type;
		this.addTask.status = true;
	}
	hideAddTaskWindow() {
		this.addTask.status = false;
		this.addTask.type = 'unset';
	}

	// showAddShipmentTaskWindow() {
	// 	this.addShipmentTask = true;
	// }
	// hideAddShipmentTaskWindow() {
	// 	this.addShipmentTask = false;
	// }
}
