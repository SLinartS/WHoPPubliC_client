import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TStatus } from '../types/store';

import { getFakeProducts } from '../fakeAPI/fakeAPI';
import { TProductsData } from '../types/products';

export class ProductsStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public status: TStatus = 'pending';
	public products: TProductsData = {
		data: [],
		tableHeader: [],
	};

	public *getProducts() {
		try {
			console.log('request to the server...', '| Products');
			const data: TProductsData = yield getFakeProducts();
			this.products = data;
			this.status = 'done';
		} catch (error) {
			this.status = 'error';
		}
	}
}
