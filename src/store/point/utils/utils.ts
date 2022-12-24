import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StorePointUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }
}
