import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { IProductResponse, TProductsData } from './type';

export class StoreProducts {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  // STATUS FETCH PRODUCTS
  private _statusFetchProducts: TStatus = 'pending';

  public get statusFetchProducts() {
    return this._statusFetchProducts;
  }

  public set statusFetchProducts(newStatus: TStatus) {
    this._statusFetchProducts = newStatus;
  }

  // STATUS GET PRODUCTS OF TASKS
  private _statusGetProductsOfTask: TStatus = 'done';

  public get statusGetProductsOfTask() {
    return this._statusGetProductsOfTask;
  }

  public set statusGetProductsOfTask(newStatus: TStatus) {
    this._statusGetProductsOfTask = newStatus;
  }

  private _statusAddProducts: TStatus = 'pending';

  // STATUS ADD PRODUCTS

  public get statusAddProducts() {
    return this._statusAddProducts;
  }

  public set statusAddProducts(newStatus: TStatus) {
    this._statusAddProducts = newStatus;
  }

  /*  Arrays of data 
      from the server */
  public products: TProductsData = {
    data: [],
    tableHeader: [],
  };

  public productsOfTask: TProductsData = {
    data: [],
    tableHeader: [],
  };

  public *fetchProducts() {
    try {
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>('products');
      this.products = response.data;
      this.statusFetchProducts = 'done';
    } catch (error) {
      this.statusFetchProducts = 'error';
    }
  }

  public *fetchProductsOfAcceptanceTask(taskTitle: string) {
    try {
      const response: AxiosResponse<TProductsData> =
        yield extendAxios.get<TProductsData>(`products/${taskTitle}`);
      this.productsOfTask = response.data;
      this.statusGetProductsOfTask = 'done';
    } catch (error) {
      this.statusGetProductsOfTask = 'error';
    }
  }

  public *addProducts() {
    try {
      const newProductData = {
        products: this.rootStore.storeFormProduct.productList,
        warehousePoints: this.rootStore.storeFormTask.addWarehousePoint,
        userId: '1',
      };
      const response: AxiosResponse<IProductResponse> =
        yield extendAxios.post<IProductResponse>('products', newProductData);
      for (const productId of response.data.productIds) {
        this.rootStore.storeFormTask.addProduct(productId);
      }

      this.statusAddProducts = 'done';
    } catch (error) {
      this.statusAddProducts = 'error';
    }
  }
}
