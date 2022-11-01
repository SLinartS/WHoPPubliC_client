import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { TMap } from './type';

export class MapStore {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Status of receiving 
      data from the server  */
  private _status: TStatus = 'pending';

  public get status() {
    return this._status;
  }

  public set status(newStatus: TStatus) {
    this._status = newStatus;
  }

  /*  Is the current open 
      map a pop-up window  */
  private _isSelectedMap: boolean = false;

  public get isSelectedMap() {
    return this._isSelectedMap;
  }

  public set isSelectedMap(newStatus: boolean) {
    this._isSelectedMap = newStatus;
  }

  /*  Array of data 
      from the server */
  public _mapData: TMap = [];

  public get mapData() {
    return this._mapData;
  }

  public set mapData(newMapData: TMap) {
    this._mapData = newMapData;
  }

  /*  Set the 'active' switch 
      at the floor to the true, 
      which will color it */
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
