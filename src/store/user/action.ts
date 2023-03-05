import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IOneUser, IRequestUserData, IResponseUserDelete, IUser } from './type';

export class StoreUserAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(search: string, actionIfDone?: () => void) {
    try {
      this.root.storeUser.status.set('fetch', 'during');
      const response: AxiosResponse<IUser[]> =
        yield extendAxios.get<AxiosResponse>(
          `users${search ? `?search=${search}` : ''}`,
        );
      this.root.storeUser.state.users = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeUser.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeUser.status.set('fetch', 'error');
    }
  }

  public *show(id: number, actionIfDone?: () => void) {
    try {
      this.root.storeUser.status.set('show', 'during');
      const response: AxiosResponse<IOneUser> =
        yield extendAxios.get<AxiosResponse>(`users/${id}`);
      this.root.storeUser.state.user = response.data;

      if (actionIfDone) {
        actionIfDone();
      }

      this.root.storeUser.status.set('show', 'done');
    } catch (error) {
      this.root.storeUser.status.set('show', 'error');
    }
  }

  public *store(actionIfDone?: () => void) {
    const fields = this.root.storePopup.form.user.formData;
    const requestData: IRequestUserData = {
      fields,
      workSchedules: this.root.storePopup.select.workSchedules.workSchedules,
    };
    try {
      this.root.storeUser.status.set('store', 'during');
      yield extendAxios.post(`users`, requestData);
      this.root.storeUser.status.set('store', 'done');
      this.root.storeTable.selectedItem.setItemId('users', 'users', 0);
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeUser.status.set('store', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    const fields = this.root.storePopup.form.user.formData;
    const requestData: IRequestUserData = {
      fields,
      workSchedules: this.root.storePopup.select.workSchedules.workSchedules,
    };
    try {
      this.root.storeUser.status.set('update', 'during');
      yield extendAxios.put('users', requestData);
      this.root.storeUser.status.set('update', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeUser.status.set('update', 'error');
    }
  }

  public *destroy(id: number, actionIfDone?: () => void) {
    try {
      this.root.storeUser.status.set('destroy', 'during');
      yield extendAxios.delete(`users/${id}`);

      this.root.storeUser.status.set('destroy', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      const typeError = error as AxiosError<IResponseUserDelete>;
      this.root.storeUser.status.set('destroy', 'error');
      this.root.storePopup.status.show('windowInformation', () => {
        this.root.storePopup.windows.information.setting = {
          text: typeError.response?.data.message,
        };
      });
    }
  }
}
