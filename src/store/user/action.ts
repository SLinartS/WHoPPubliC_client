import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IRequestUserData, IResponseUserDelete, IUser } from './type';

export class StoreUserAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch(actionIfDone?: () => void) {
    try {
      const response: AxiosResponse<IUser[]> =
        yield extendAxios.get<AxiosResponse>('users');
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
      const response: AxiosResponse<IUser> =
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
    const { storePopup } = this.root;
    const requestData: IRequestUserData = {
      fields: storePopup.form.user.formData,
    };
    try {
      yield extendAxios.post(`users`, requestData);
      this.root.storeUser.status.set('store', 'done');
      if (actionIfDone) {
        actionIfDone();
      }
    } catch (error) {
      this.root.storeUser.status.set('store', 'error');
    }
  }

  public *update(actionIfDone?: () => void) {
    const { storePopup } = this.root;
    const requestData: IRequestUserData = {
      fields: storePopup.form.user.formData,
    };
    const userId = requestData.fields.id.value;
    try {
      yield extendAxios.put(`users/${userId}`, requestData);
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
