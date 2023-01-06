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

      storePopup.form.task.setFormField('id', String(taskInfo.id.value));
      storePopup.form.task.setFormField('article', taskInfo.article.value);
      storePopup.form.task.setFormField('dateEnd', taskInfo.dateEnd.value);
      storePopup.form.task.setFormField('dateStart', taskInfo.dateStart.value);
      storePopup.select.products.setProductList(response.data.productIds);
      storePopup.select.warehousePoints.setItems(
        response.data.warehousePointIds,
      );

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchOne', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchOne', 'error');
    }
  }

  public *acceptanceTasks(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/acceptance',
      );
      this.root.storeTask.state.acceptanceList = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchAcceptance', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchAcceptance', 'error');
    }
  }

  public *shipmentTasks(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/shipment',
      );
      this.root.storeTask.state.shipmentList = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchShipment', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchShipment', 'error');
    }
  }

  // !not implemented on the server
  public *intraTasks(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<ITasks> = yield extendAxios.get<ITasks>(
        'tasks/intra',
      );
      this.root.storeTask.state.intraList = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeTask.status.set('fetchIntra', 'done');
    } catch (error) {
      this.root.storeTask.status.set('fetchIntra', 'error');
    }
  }
}
