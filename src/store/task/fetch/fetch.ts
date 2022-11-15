import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { ITasks } from '../type';

export class StoreTaskFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *acceptanceTasks() {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/acceptance',
      );
      this.root.storeTask.state.acceptanceList = response.data;
      this.root.storeTask.status.set('fetchAcceptance', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchAcceptance', 'error');
    }
  }

  public *shipmentTasks() {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/shipment',
      );
      this.root.storeTask.state.shipmentList = response.data;
      this.root.storeTask.status.set('fetchShipment', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchShipment', 'error');
    }
  }
}
