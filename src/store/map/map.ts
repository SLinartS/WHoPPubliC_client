import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { TMap } from './type';

export class MapStore {
  private _rootStore!: RootStore;

  private set rootStore(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
  }

  public _status: TStatus = 'pending';

  public get status() {
    return this._status;
  }

  public set status(newStatus: TStatus) {
    this._status = newStatus;
  }

  public _mapData: TMap = [];

  public get mapData() {
    return this._mapData;
  }

  public set mapData(newMapData: TMap) {
    this._mapData = newMapData;
  }

  public setFloorActive(
    zoneIndex: number,
    sectionIndex: number,
    blockIndex: number,
    floorIndex: number,
    newStatus: boolean,
  ) {
    this._mapData[zoneIndex].sections[sectionIndex].blocks[blockIndex].floors[
      floorIndex
    ].active = newStatus;
  }

  public *getMap() {
    try {
      const response: AxiosResponse<TMap> = yield extendAxios.get<TMap>('map');
      this.mapData = response.data;
      this.status = 'done';
    } catch (error) {
      this.status = 'error';
    }
  }
}
