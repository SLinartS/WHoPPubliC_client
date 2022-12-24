import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';

export class StoreMapUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }
}
