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
    return this.root.storeState.checkMark
      .getCheckMarksByType(itemType)
      .filter((markItem) => markItem.value === true)
      .map((markItem) => markItem.label);
  }

  public setDefaulMark(
    itemType: TMarkType,
    data: IProduct[] | ITask[],
    exсludeColumns: string[],
  ) {
    Object.keys(data[0]).forEach((key) => {
      if (!exсludeColumns.includes(key)) {
        this.root.storeState.checkMark.changeCheckedMark(key, true, itemType);
      } else {
        this.root.storeState.checkMark.changeCheckedMark(key, false, itemType);
      }
    });
  }
}
