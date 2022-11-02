import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { IAddProductResponse, TProductsData } from './type';

export class ProductsStore {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  // STATUS
  private _statusGetProducts: TStatus = 'pending';

  private _statusGetProductsOfTask: TStatus = 'done';

  private _statusAddProducts: TStatus = 'pending';

  // Getters
  public get statusGetProducts() {
    return this._statusGetProducts;
  }

  public get statusGetProductsOfTask() {
    return this._statusGetProductsOfTask;
  }

  public get statusAddProducts() {
    return this._statusAddProducts;
  }

  // Setters
  public set statusGetProducts(newStatus: TStatus) {
    this._statusGetProducts = newStatus;
  }

  public set statusGetProductsOfTask(newStatus: TStatus) {
    this._statusGetProductsOfTask = newStatus;
  }

  public set statusAddProducts(newStatus: TStatus) {
    this._statusAddProducts = newStatus;
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

  public *addProducts() {
    try {
      const newProductData = {
        products: this.rootStore.addProductFormStore.addedProductList,
        warehousePoints: this.rootStore.addTaskFormStore.addWarehousePoint,
        userId: '1',
        categoryId: '1',
      };
      const response: AxiosResponse<IAddProductResponse> =
        yield extendAxios.post<IAddProductResponse>('products', newProductData);
      for (const productId of response.data.productIds) {
        this.rootStore.addTaskFormStore.addProduct(productId);
      }

      this.statusAddProducts = 'done';
    } catch (error) {
      this.statusAddProducts = 'error';
    }
  }
}
