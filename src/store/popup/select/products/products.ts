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

  private array: TArrayOrErrorType = deepCopy(INITIAL_ARRAY_VALUE);

  public get arrayValue() {
    return this.array.value;
  }

  public get arrayErrors() {
    return toJS(this.array.errors);
  }

  public set arrayErrors(newError: string[]) {
    this.array.errors = newError;
  }

  public getProductListData(): IProduct[] {
    const productList = this.array.value;
    const productListData: IProduct[] =
      this.root.storeProduct.state.products.data.filter((product) =>
        productList.includes(product.id),
      );
    return productListData;
  }

  public setProductList(productIds: number[]) {
    this.array.value = productIds;
    this.root.storePopup.select.utils.utils.checkErrorsExist('products');
  }

  public addProductToList() {
    this.array.value.push(
      this.root.storeTable.selectedItem.getItemId('products'),
    );

    this.root.storePopup.select.utils.utils.checkErrorsExist('products');
  }

  public removeProductFromList() {
    this.array.value = this.array.value.filter(
      (id) => id !== this.root.storeTable.selectedItem.getItemId('products'),
    );

    this.root.storePopup.select.utils.utils.checkErrorsExist('products');
  }

  public clearProductList() {
    this.array = INITIAL_ARRAY_VALUE;
  }
}
