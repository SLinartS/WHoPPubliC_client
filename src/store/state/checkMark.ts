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
      mark: 'interface',
    },
  ];

  public checkMark(label: string) {
    const mark = this.checkMarks.find((markItem) => markItem.label === label);
    if (mark) {
      return mark.value;
    }
    return false;
  }

  public getCheckMarksByType(mark: TMarkType) {
    const filteredMarks = this.checkMarks.filter(
      (markItem) => markItem.mark === mark,
    );
    return filteredMarks;
  }

  public changeCheckedMark(label: string, isChecked: boolean, mark: TMarkType) {
    if (
      this.checkMarks.find(
        (markItem) => markItem.label === label && markItem.mark === mark,
      )
    ) {
      this.checkMarks = this.checkMarks.map((markItem) => {
        if (markItem.label === label && markItem.mark === mark) {
          return {
            label,
            value: isChecked,
            mark,
          };
        }
        return markItem;
      });
    } else {
      this.checkMarks.push({
        label,
        value: isChecked,
        mark,
      });
    }
  }

  public clearAllMarks() {
    this.checkMarks = [];
  }
}
