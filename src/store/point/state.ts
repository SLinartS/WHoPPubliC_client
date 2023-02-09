import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IPoints } from './type';

export class StorePoint {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _points: IPoints = {
    acceptance: [],
    shipment: [],
  };

  public get points() {
    return this._points;
  }

  public set points(newPoints: IPoints) {
    this._points = newPoints;
  }
}
