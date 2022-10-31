import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import extendAxios from '../../utils/extendAxios';
import RootStore from '../root';
import { TStatus } from '../type';
import { TPoints } from './type';

export class PointStore {
  private _rootStore!: RootStore;

  private get rootStore() {
    return this._rootStore;
  }

  private set rootStore(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
  }

  /*  Status of receiving 
      data from the server  
      ACCEPTANCE POINTS   */
  private _acceptanceStatus: TStatus = 'pending';

  public get acceptanceStatus() {
    return this._acceptanceStatus;
  }

  public set acceptanceStatus(newStatus: TStatus) {
    this._acceptanceStatus = newStatus;
  }

  /*  Status of receiving 
      data from the server  
      SHIPMENT POINTS   */
  private _shipmentStatus: TStatus = 'pending';

  public get shipmentStatus() {
    return this._shipmentStatus;
  }

  public set shipmentStatus(newStatus: TStatus) {
    this._shipmentStatus = newStatus;
  }

  /*  Array of data 
      from the server 
      ACCEPTANCE POINTS */
  private _acceptancePoints: TPoints = [];

  public get acceptancePoints() {
    return this._acceptancePoints;
  }

  public set acceptancePoints(newPoints: TPoints) {
    this._acceptancePoints = newPoints;
  }

  /*  Array of data 
      from the server
      SHIPMENT POINTS */
  private _shipmentPoints: TPoints = [];

  public get shipmentPoints() {
    return this._shipmentPoints;
  }

  public set shipmentPoints(newPoints: TPoints) {
    this._shipmentPoints = newPoints;
  }

  public *getPoints() {
    try {
      const { currentTaskType } = this.rootStore.addTaskFormStore;
      const response: AxiosResponse<TPoints> = yield extendAxios.get<TPoints>(
        `points/${currentTaskType}`,
      );
      if (currentTaskType === 'acceptance') {
        this.acceptancePoints = response.data;
        this.acceptanceStatus = 'done';
      } else {
        this.shipmentPoints = response.data;
        this.shipmentStatus = 'done';
      }
    } catch (error) {
      this.acceptanceStatus = 'error';
      this.shipmentStatus = 'error';
    }
  }
}
