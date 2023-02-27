import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IPerformanceReport } from './type';

export class StorePerformanceReportAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(search: string) {
    try {
      const response: AxiosResponse<IPerformanceReport[]> =
        yield extendAxios.get<AxiosResponse>(
          `performance-report${search ? `?search=${search}` : ''}`,
        );

      this.root.storePerformanceReport.state.reports = response.data;

      this.root.storePerformanceReport.status.set('fetch', 'done');
    } catch (error) {
      this.root.storePerformanceReport.status.set('fetch', 'error');
    }
  }

  public *store(actionIfDone: () => void) {
    try {
      yield extendAxios.post<AxiosResponse>('performance-report');
      actionIfDone();
      this.root.storePerformanceReport.status.set('store', 'done');
    } catch (error) {
      this.root.storePerformanceReport.status.set('store', 'error');
    }
  }

  public *download(id: number, title: string, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<Blob> =
        yield extendAxios.get<AxiosResponse>(`performance-report/${id}`, {
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
      this.root.storePerformanceReport.status.set('download', 'done');
    } catch (error) {
      this.root.storePerformanceReport.status.set('download', 'error');
    }
  }

  public *destroy(id: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`performance-report/${id}`);

      if (actionIfDone) {
        actionIfDone();
      }
      this.root.storePerformanceReport.status.set('destroy', 'done');
    } catch (error) {
      this.root.storePerformanceReport.status.set('destroy', 'error');
    }
  }
}
