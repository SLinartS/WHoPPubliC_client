import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IAccount } from './type';

export class StoreAccountActions {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IAccount[]> =
        yield extendAxios.get<AxiosResponse>(`accounts`);
      this.root.storeAccount.state.accounts = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeAccount.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeAccount.status.set('fetch', 'error');
    }
  }
}
