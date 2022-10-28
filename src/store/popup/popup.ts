import { makeAutoObservable } from 'mobx';
import RootStore from '../root';

export class PopupStore {
	private _rootStore!: RootStore;

	private set rootStore(rootStore: RootStore) {
		this._rootStore = rootStore;
	}

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	/* 
	* AddProduct 
	*/
	private _addProductStatus: boolean = false;

	public get addProductStatus() {
		return this._addProductStatus;
	}

	showAddProductWindow() {
		this._addProductStatus = true;
	}
	hideAddProductWindow() {
		this._addProductStatus = false;
	}

	/* 
	* AddTask
	*/
	private _addTaskStatus: boolean = false;

	public get addTaskStatus() {
		return this._addTaskStatus;
	}

	showAddTaskWindow() {
		this._addTaskStatus = true;
	}
	hideAddTaskWindow() {
		this._addTaskStatus = false;
	}

	/* 
	* SelectMap
	*/
	private _selectMapStatus: boolean = false;

	public get selectMapStatus() {
		return this._selectMapStatus;
	}

	showSelectMap() {
		this._selectMapStatus = true;
	}
	hideSelectMap() {
		this._selectMapStatus = false;
	}
}
