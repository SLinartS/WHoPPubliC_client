import { makeAutoObservable } from 'mobx';

import RootStore from './root';
import { TStatus } from '../types/store';

import { TProductsData, TProductsOfTaskData } from '../types/products';
import extendAxios from '../utils/extendAxios';
import { AxiosResponse } from 'axios';

export class ProductsStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	public productsStatus: TStatus = 'pending';
	public productsOfAcceptanceTaskStatus: TStatus = 'pending';

	public products: TProductsData = {
		data: [],
		tableHeader: [],
	};

	public productsOfAcceptanceTask: TProductsData = {
		data: [],
		tableHeader: [],
	};

	public *getProducts() {
		try {
			console.log('request to the server...', '| Products');
			const response: AxiosResponse<TProductsData> = yield extendAxios.get<TProductsData>(
				'products',
			);
			this.products = response.data;
			this.productsStatus = 'done';
		} catch (error) {
			this.productsStatus = 'error';
		}
	}

	public *getProductsOfAcceptanceTask(taskId: number) {
		try {
			console.log('request to the server...', '| Products');
			const response: AxiosResponse<TProductsData> = yield extendAxios.get<TProductsData>(
				`products/${taskId}`,
			);
			this.productsOfAcceptanceTask = response.data;
			this.productsOfAcceptanceTaskStatus = 'done';
		} catch (error) {
			this.productsOfAcceptanceTaskStatus = 'error';
		}
	}
}
