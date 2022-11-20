import { makeAutoObservable } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { IProductFormList } from './type';

export class StoreFormProductList {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _list: IProductFormList[] = [];

  public get list() {
    return this._list;
  }

  public addProductToList() {
    this._list.push({
      fields: deepCopy(this.root.storeForm.product.field.formData),
      points: this.root.storeForm.product.array.getFormArrays('points'),
    });
  }

  public removeProductFromList(article: string) {
    this._list = this._list.filter(
      (product) => product.fields.article.value !== article,
    );
  }

  public clearProductList() {
    this._list = [];
  }
}
