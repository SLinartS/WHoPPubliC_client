import { TUserRole } from '@store/authorization/type';
import { IOption } from '@store/category/type';
import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export class StoreRoleAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      const response: AxiosResponse<IOption<TUserRole>[]> =
        yield extendAxios.get<AxiosResponse>('roles');

      this.root.storeRole.state.roles = response.data;

      this.root.storeRole.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeRole.status.set('fetch', 'error');
    }
  }
}
