import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import extendAxios from '../../../utils/extendAxios';
import RootStore from '../../root';
import { IOneTask, ITasks } from '../type';

export class StoreTaskFetch {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *oneTask(taskId: number, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IOneTask> = yield extendAxios.get<IOneTask>(
        `taskinfo/${taskId}`,
      );
      const { taskInfo } = response.data;
      const { storePopup } = this.root;

      storePopup.form.task.setFormField('article', taskInfo.article);
      storePopup.form.task.setFormField('dateEnd', taskInfo.dateEnd);
      storePopup.form.task.setFormField('dateStart', taskInfo.dateStart);
      storePopup.select.products.setProductList(response.data.productIds);
      storePopup.select.warehousePoints.setItems(
        response.data.warehousePointIds,
      );

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchAcceptance', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchAcceptance', 'error');
    }
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
