import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { ICurrentViewProductInfomation } from './type';

export class StorePopupViewProduct {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private currentViewProductInformation: ICurrentViewProductInfomation = {
    id: 0,
    pointId: 0,
    floorIds: [],
  };

  public getFloorIds() {
    return this.currentViewProductInformation.floorIds;
  }

  public setCurrentViewProduct(id: number) {
    this.currentViewProductInformation.id = id;

    this.root.storeProduct.fetch.oneProduct(id, () => {
      const { product } = this.root.storeProduct.state;

      this.currentViewProductInformation.pointId = product.pointId;
      this.currentViewProductInformation.floorIds =
        product.serviceInformation.floorIds;
    });

    console.log(this.currentViewProductInformation);
  }
}
