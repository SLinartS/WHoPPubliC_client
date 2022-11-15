import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { IPoints } from '../type';

export class StorePointUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public setPointActive(
    pointType: keyof IPoints,
    pointIndex: number,
    newStatus: boolean,
  ) {
    this.root.storePoint.state.points[pointType][pointIndex].active = newStatus;
  }
}
