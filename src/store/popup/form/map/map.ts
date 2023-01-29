import { IZone } from '@store/map/type';
import RootStore from '@store/root';
import deepCopy from '@utils/deepCopy/deepCopy';
import { makeAutoObservable } from 'mobx';

export class StorePopupFormMap {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _currentZone: IZone = {
    id: 0,
    number: 0,
    sections: [],
    zoneLetter: '',
  };

  public get currentZone() {
    return this._currentZone;
  }

  public set currentZone(newCurrentZone: IZone) {
    this._currentZone = newCurrentZone;
  }

  public setCurrentZoneId(zoneId: number) {
    const currentZone = this.root.storeMap.state.map.find(
      (zone) => zone.id === zoneId,
    );
    if (currentZone) {
      this._currentZone.id = currentZone.id;
      this._currentZone.sections = deepCopy(currentZone.sections);
      this._currentZone.zoneLetter = currentZone.zoneLetter;
      this._currentZone.number = currentZone.number;
    }
  }
}
