import { makeAutoObservable } from 'mobx';

import RootStore from '../../../root';
import { IProductFormDataFields } from '../field/type';

export class StoreFormProductList {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  private _list: IProductFormDataFields[] = [];

  public get list() {
    return this._list;
  }

  public addProductToList() {
    this._list.push({
      ...this.rootStore.storeFormProductField.formData,
    });
  }

  public removeProductFromList(article: string) {
    this._list = this._list.filter(
      (product) => product.article.value !== article,
    );
  }

  public clearProductList() {
    this._list = [];
  }
}
