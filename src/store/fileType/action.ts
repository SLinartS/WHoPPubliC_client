import { IOption } from '@store/category/type';
import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { TReportType } from './type';

export class StoreFileTypeAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IOption<TReportType>[]> =
        yield extendAxios.get<AxiosResponse>('file-types');

      this.root.storeFileType.state.fileTypes = response.data;
      if (actionIfDone) {
        actionIfDone();
      }
      this.root.storeFileType.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeFileType.status.set('fetch', 'error');
    }
  }
}
