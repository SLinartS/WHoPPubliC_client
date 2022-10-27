import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import { addProductFormData } from '../form/type';
import { TProductsData } from '../popup/type';
import RootStore from '../root';
import { TStatus } from '../type';

export class ProductsStore {
	private _rootStore!: RootStore;

	private set rootStore(rootStore: RootStore) {
		this._rootStore = rootStore;
	}

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}

	// STATUS
	private _statusGetProducts: TStatus = 'pending';
	private _statusGetProductsOfTask: TStatus = 'done';
	private _statusAddProduct: TStatus = 'pending';

	// Getters
	public get statusGetProducts() {
		return this._statusGetProducts;
	}
	public get statusGetProductsOfTask() {
		return this._statusGetProductsOfTask;
	}
	public get statusAddProduct() {
		return this._statusAddProduct;
	}

	// Setters
	public set statusGetProducts(newStatus: TStatus) {
		this._statusGetProducts = newStatus;
	}
	public set statusGetProductsOfTask(newStatus: TStatus) {
		this._statusGetProductsOfTask = newStatus;
	}
	public set statusAddProduct(newStatus: TStatus) {
		this._statusAddProduct = newStatus;
	}

	public products: TProductsData = {
		data: [],
		tableHeader: [],
	};

	public productsOfTask: TProductsData = {
		data: [],
		tableHeader: [],
	};

	public *getProducts() {
		try {
			const response: AxiosResponse<TProductsData> = yield extendAxios.get<TProductsData>(
				'products',
			);
			this.products = response.data;
			this.statusGetProducts = 'done';
		} catch (error) {
			this.statusGetProducts = 'error';
		}
	}

	public *getProductsOfAcceptanceTask(taskTitle: string) {
		try {
			const response: AxiosResponse<TProductsData> = yield extendAxios.get<TProductsData>(
				`products/${taskTitle}`,
			);
			this.productsOfTask = response.data;
			this.statusGetProductsOfTask = 'done';
		} catch (error) {
			this.statusGetProductsOfTask = 'error';
		}
	}

	public *addProduct(productData: addProductFormData, taskTitle: string, userId: string) {
		try {
			productData.taskTitle = taskTitle;
			productData.userId = userId;
			productData.stored = '0';
			const response: AxiosResponse = yield extendAxios.post(`products`, productData);
			console.log(response);
			this.statusAddProduct = 'done';
		} catch (error) {
			this.statusAddProduct = 'error';
		}
	}
}
