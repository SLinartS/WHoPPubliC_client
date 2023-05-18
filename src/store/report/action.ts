import { TReportType } from '@store/fileType/type';
import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IReport } from './type';

export class StoreReportAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(search: string) {
    try {
      const response: AxiosResponse<IReport[]> =
        yield extendAxios.get<AxiosResponse>(
          `reports${search ? `?search=${search}` : ''}`,
        );

      this.root.storeReport.state.reports = response.data;

      this.root.storeReport.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeReport.status.set('fetch', 'error');
    }
  }

  public *store(reportType: TReportType, actionIfDone: () => void) {
    try {
      yield extendAxios.post<AxiosResponse>('reports', { reportType });
      actionIfDone();
      this.root.storeReport.status.set('store', 'done');
    } catch (error) {
      this.root.storeReport.status.set('store', 'error');
    }
  }

  public *download(id: number, title: string, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<Blob> =
        yield extendAxios.get<AxiosResponse>(`reports/${id}`, {
          responseType: 'blob',
        });
      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');

      link.href = href;
      link.setAttribute('download', title);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      if (actionIfDone) {
        actionIfDone();
      }
      this.root.storeReport.status.set('download', 'done');
    } catch (error) {
      this.root.storeReport.status.set('download', 'error');
    }
  }

  public *destroy(id: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`reports/${id}`);

      if (actionIfDone) {
        actionIfDone();
      }
      this.root.storeReport.status.set('destroy', 'done');
    } catch (error) {
      this.root.storeReport.status.set('destroy', 'error');
    }
  }
}
