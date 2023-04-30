import { IOption } from '@store/category/type';
import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export class StoreAudienceAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      const response: AxiosResponse<IOption[]> =
        yield extendAxios.get<AxiosResponse>('audiences');

      this.root.storeAudience.state.audiences = response.data;

      this.root.storeAudience.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeAudience.status.set('fetch', 'error');
    }
  }
}
