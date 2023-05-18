import { IOption } from '@store/category/type';
import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

export class StoreRegularityAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *fetch() {
    try {
      const response: AxiosResponse<IOption<string>[]> =
        yield extendAxios.get<AxiosResponse>('regularities');

      this.root.storeRegularity.state.regularities = response.data;

      this.root.storeRegularity.status.set('fetch', 'done');
    } catch (error) {
      this.root.storeRegularity.status.set('fetch', 'error');
    }
  }
}
