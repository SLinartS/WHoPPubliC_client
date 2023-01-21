import { makeAutoObservable } from 'mobx';

import RootStore from '../../../../root';

export class StorePopupSelectUtilsFloorSpace {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private getFreeSpace() {
    const selectedFloors = this.root.storePopup.select.floors.values;
    let freeSpace = 0;

    this.root.storeMap.state.map.forEach((zone) => {
      zone.sections.forEach((section) => {
        section.blocks.forEach((block) => {
          block.floors.forEach((floor) => {
            if (selectedFloors.includes(floor.id)) {
              freeSpace += floor.freeSpace;
            }
          });
        });
      });
    });

    return freeSpace;
  }

  public isEnoughFreeSpace() {
    if (this.getOccupiedSpace() <= this.getFreeSpace()) {
      return true;
    }
    return false;
  }

  public getOccupiedSpace(): number {
    let occepiedSpace = 0;
    const productListData =
      this.root.storePopup.select.products.getProductListData();
    for (const product of productListData) {
      occepiedSpace += Number(product.number.value);
    }
    return occepiedSpace;
  }
}
