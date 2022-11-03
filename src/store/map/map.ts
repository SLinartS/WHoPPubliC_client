import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { IZone } from './type';

export class StoreMap {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  Status of receiving 
      data from the server  */
  private _statusFetchMap: TStatus = 'pending';

  public get statusFetchMap() {
    return this._statusFetchMap;
  }

  public set statusFetchMap(newStatus: TStatus) {
    this._statusFetchMap = newStatus;
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

  /*  Array of data 
      from the server */
  public _mapData: IZone[] = [];

  public get mapData() {
    return this._mapData;
  }

  public set mapData(newMapData: IZone[]) {
    this._mapData = newMapData;
  }

  public *fetchMap() {
    try {
      const response: AxiosResponse<IZone[]> = yield extendAxios.get<IZone[]>(
        'map',
      );
      this.mapData = response.data;
      this.statusFetchMap = 'done';
    } catch (error) {
      this.statusFetchMap = 'error';
    }
  }
}
