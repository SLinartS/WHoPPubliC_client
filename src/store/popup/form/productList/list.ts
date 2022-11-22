import { makeAutoObservable } from 'mobx';

import deepCopy from '../../../../utils/deepCopy/deepCopy';
import RootStore from '../../../root';
import { IProductFormList } from './type';

export class StorePopupFormProductList {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _list: IProductFormList[] = [];

  public get list() {
    return this._list;
  }

  public addProductToList() {
    this._list.push({
      fields: deepCopy(this.root.storePopup.form.product.formData),
      points: this.root.storePopup.select.points.arrayValue,
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
