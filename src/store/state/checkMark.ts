import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ICheckMark, TMarkType } from './type';

export class StoreStateCheckMark {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private checkMarks: ICheckMark[] = [
    {
      label: 'rememberMe',
      value: true,
      type: 'interface',
    },
  ];

  public checkMark(label: string, type: TMarkType) {
    const mark = this.checkMarks.find(
      (markItem) => markItem.label === label && markItem.type === type,
    );
    if (mark) {
      return mark.value;
    }
    return false;
  }

  public getCheckMarksByType(type: TMarkType) {
    const filteredMarks = this.checkMarks.filter(
      (markItem) => markItem.type === type,
    );
    return filteredMarks;
  }

  public changeCheckedMark(label: string, isChecked: boolean, type: TMarkType) {
    if (
      this.checkMarks.find(
        (markItem) => markItem.label === label && markItem.type === type,
      )
    ) {
      this.checkMarks = this.checkMarks.map((markItem) => {
        if (markItem.label === label && markItem.type === type) {
          return {
            label,
            value: isChecked,
            type,
          };
        }
        return markItem;
      });
    } else {
      this.checkMarks.push({
        label,
        value: isChecked,
        type,
      });
    }
  }

  public clearAllMarks() {
    this.checkMarks = [];
  }
}
