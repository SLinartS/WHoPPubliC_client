import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IAccount, IRequestAccountData, IResponseAccountDelete } from './type';

export class StoreAccountAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IAccount[]> =
        yield extendAxios.get<AxiosResponse>('users');
      this.root.storeAccount.state.accounts = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeAccount.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeAccount.status.set('fetch', 'error');
    }
  }

  public *show(id: number, actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IAccount> =
        yield extendAxios.get<AxiosResponse>(`users/${id}`);
      this.root.storeAccount.state.account = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeAccount.status.set('show', 'done');
    } catch (error) {
      this.root.storeAccount.status.set('show', 'error');
    }
  }

  public *store(actionIfDone?: () => void) {
    const { storePopup } = this.root;
    const requestData: IRequestAccountData = {
      fields: storePopup.form.account.formData,
    };
    try {
      yield extendAxios.post(`users`, requestData);
      this.root.storeAccount.status.set('store', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeAccount.status.set('store', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    const { storePopup } = this.root;
    const requestData: IRequestAccountData = {
      fields: storePopup.form.account.formData,
    };
    const userId = requestData.fields.id.value;
    try {
      yield extendAxios.put(`users/${userId}`, requestData);
      this.root.storeAccount.status.set('update', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeAccount.status.set('update', 'error');
    }
  }

  public *destroy(id: number, actionIfDone?: () => void) {
    try {
      yield extendAxios.delete(`users/${id}`);

      this.root.storeAccount.status.set('destroy', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      const typeError = error as AxiosError<IResponseAccountDelete>;
      this.root.storeAccount.status.set('destroy', 'error');
      this.root.storePopup.status.show('windowInformation', () => {
        this.root.storePopup.windows.information.setting = {
          text: typeError.response?.data.message,
        };
      });
    }
  }
}
