import { makeAutoObservable } from 'mobx';

import { IProduct } from '../product/type';
import RootStore from '../root';
import { TMarkType } from '../state/type';
import { ITask } from '../task/type';

export class StoreTableUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public getColumnsWithMark(itemType: TMarkType) {
    return Object.entries(
      this.root.storeState.checkMark.getCheckMarksByType(itemType),
    )
      .filter(([key, value]) => value.value === true)
      .map((item) => item[0]);
  }

  public setDefaulMark(itemType: TMarkType, data: IProduct[] | ITask[]) {
    console.log(Object.keys(data[0]));
    Object.keys(data[0]).forEach((key) => {
      this.root.storeState.checkMark.changeCheckedMark(key, true, itemType);
    });
  }
}