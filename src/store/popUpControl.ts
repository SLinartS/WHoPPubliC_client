import { makeAutoObservable } from 'mobx';

import RootStore from './root';

export class PopUpControlStore {
	private _rootStore!: RootStore;

	private set rootStore(rootStore: RootStore) {
		this._rootStore = rootStore;
	}

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	private addProduct: boolean = false;
	private addAcceptanceTask: boolean = false;
	private addShipmentTask: boolean = false;

	// Getters
	public get addProductStatus() {
		return this.addProduct;
	}
	public get addAcceptanceTaskStatus() {
		return this.addAcceptanceTask;
	}
	public get addShipmentTaskStatus() {
		return this.addShipmentTask;
	}

	// addProduct
	showAddProductWindow() {
		this.addProduct = true;
	}
	hideAddProductWindow() {
		this.addProduct = false;
	}

	// AddAcceptanceTask
	showAddAcceptanceTaskWindow() {
		this.addAcceptanceTask = true;
	}
	hideAddAcceptanceTaskWindow() {
		this.addAcceptanceTask = false;
	}

	// AddShipmentTask
	showAddShipmentTaskWindow() {
		this.addShipmentTask = true;
	}
	hideAddShipmentTaskWindow() {
		this.addShipmentTask = false;
	}
}
