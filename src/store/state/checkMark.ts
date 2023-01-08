import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ICheckMark, TMarkType } from './type';

export class StoreStateCheckMark {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private checkMarks: ICheckMark = {
    rememberMe: {
      value: true,
      mark: 'interface',
    },
  };

  public checkMark(label: string) {
    if (this.checkMarks[label]) {
      return this.checkMarks[label].value;
    }
    return false;
  }

  public getCheckMarksByType(mark: TMarkType) {
    const filteredArray = Object.entries(this.checkMarks).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, item]) => item.mark === mark,
    );

    const filteredObject: ICheckMark = {};
    filteredArray.forEach(([key, value]) => {
      filteredObject[key] = value;
    });
    return filteredObject;
  }

  public changeCheckedMark(label: string, isChecked: boolean, mark: TMarkType) {
    this.checkMarks[label] = {
      value: false,
      mark: 'interface',
    };
    this.checkMarks[label].value = isChecked;
    this.checkMarks[label].mark = mark;
  }

  public clearAllMarks() {
    this.checkMarks = {};
  }
}
