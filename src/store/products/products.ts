import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { TProductsData } from './type';

export class ProductsStore {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
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
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>('products');
      this.products = response.data;
      this.statusGetProducts = 'done';
    } catch (error) {
      this.statusGetProducts = 'error';
    }
  }

  public *getProductsOfAcceptanceTask(taskTitle: string) {
    try {
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>(`products/${taskTitle}`);
      this.productsOfTask = response.data;
      this.statusGetProductsOfTask = 'done';
    } catch (error) {
      this.statusGetProductsOfTask = 'error';
    }
  }

  public *addProduct() {
    try {
      const newProductData = {
        ...this.rootStore.addProductFormStore.formData,
        taskTitle: this.rootStore.addTaskFormStore.currentTaskArticle,
        userId: '0',
      };
      yield extendAxios.post('products', newProductData);
      this.statusAddProduct = 'done';
    } catch (error) {
      this.statusAddProduct = 'error';
    }
  }
}
