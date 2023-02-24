import { IUserFormDataFields } from '@store/popup/form/user/type';
import {
  IOneWorkScheduleSelectData,
  TDayOfWeek,
} from '@store/popup/select/workSchedules/type';
import RootStore from '@store/root';
import { TValueOrErrorType } from '@store/type';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import {
  IOneUser,
  IRequestUserData,
  IRequestUserWorkSchedule,
  IResponseUserDelete,
  IUser,
  TRequestUserFields,
  TRequestUserWorkSchedules,
} from './type';

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
    const fields = this.getRequestFields();
    const workSchedules = this.getRequestWorkSchedules();
    const requestData: IRequestUserData = {
      fields,
      workSchedules,
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
    const fields = this.getRequestFields();
    const workSchedules = this.getRequestWorkSchedules();
    const requestData: IRequestUserData = {
      fields,
      workSchedules,
    };
    const userId = requestData.fields.id;
    try {
      this.root.storeUser.status.set('update', 'during');
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

  private getRequestFields(): TRequestUserFields {
    const { storePopup } = this.root;
    return (
      (
        Object.entries(storePopup.form.user.formData) as [
          keyof IUserFormDataFields,
          TValueOrErrorType,
        ][]
      )
        .map(([key, value]): [keyof IUserFormDataFields, string] => [
          key,
          value.value,
        ])
        /* eslint-disable no-param-reassign */
        .reduce((newFields, [key, value]) => {
          newFields[key] = value;
          return newFields;
        }, {} as TRequestUserFields)
    );
    /* eslint-enable no-param-reassign */
  }

  private getRequestWorkSchedules(): TRequestUserWorkSchedules {
    const { storePopup } = this.root;
    return (
      (
        Object.entries(
          storePopup.select.workSchedules.workSchedules,
        ) as unknown as [TDayOfWeek, IOneWorkScheduleSelectData][]
      )
        .map(([key, schedule]): [TDayOfWeek, IRequestUserWorkSchedule] => [
          key,
          {
            startTime: schedule.startTime.value,
            endTime: schedule.endTime.value,
          },
        ])
        /* eslint-disable no-param-reassign */
        .reduce((newFields, [key, value]) => {
          newFields[key] = value;
          return newFields;
        }, {} as TRequestUserWorkSchedules)
    );
    /* eslint-enable no-param-reassign */
  }
}
