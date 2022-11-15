import { makeAutoObservable } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { IProductFormDataFields } from '../field/type';

export class StoreFormProductList {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _list: IProductFormDataFields[] = [];

  public get list() {
    return this._list;
  }

  public addProductToList() {
    this._list.push(deepCopy(this.root.storeForm.product.field.formData));
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
