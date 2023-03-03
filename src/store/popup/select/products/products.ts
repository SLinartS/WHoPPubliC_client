import { makeAutoObservable, toJS } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import { IProduct } from '../../../product/type';
import RootStore from '../../../root';
import { TArrayOrErrorType } from '../../../type';
import { INITIAL_ARRAY_VALUE } from '../../form/config';

export class StorePopupSelectProducts {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _products: TArrayOrErrorType = deepCopy(INITIAL_ARRAY_VALUE);

  public get values() {
    return this._products.value;
  }

  public get errors() {
    return toJS(this._products.errors);
  }

  public set errors(newError: string[]) {
    this._products.errors = newError;
  }

  public getProductListData(): IProduct[] {
    const productList = this._products.value;
    const productListData: IProduct[] =
      this.root.storeProduct.state.products.data.filter((product) =>
        productList.includes(product.id.value),
      );
    return productListData;
  }

  public setProductList(productIds: number[]) {
    this._products.value = productIds;
  }

  public addProductToList() {
    this._products.value.push(
      this.root.storeTable.selectedItem.getItemId('products', 'products'),
    );
  }

  public removeProductFromList() {
    this._products.value = this._products.value.filter(
      (id) =>
        id !==
        this.root.storeTable.selectedItem.getItemId('products', 'products'),
    );
  }

  public clear() {
    this._products = deepCopy(INITIAL_ARRAY_VALUE);
  }
}
