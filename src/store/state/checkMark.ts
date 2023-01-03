import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { ICheckMark } from './type';

export class StoreStateCheckMark {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private checkMarks: ICheckMark = {
    rememberMe: true,
  };

  public checkMark(label: string) {
    if (this.checkMarks[label]) {
      return this.checkMarks[label];
    }
    return false;
  }

  public changeCheckedMark(label: string, isChecked: boolean) {
    this.checkMarks[label] = isChecked;
  }

  public clearAllMarks() {
    this.checkMarks = {};
  }
}
