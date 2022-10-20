import { makeAutoObservable } from 'mobx';

import RootStore from './root';

export class PopUpControlStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public addProduct: boolean = false;

	showAddProductWindow() {
		this.addProduct = true;
	}
	hideAddProductWindow() {
		this.addProduct = false;
	}
}
