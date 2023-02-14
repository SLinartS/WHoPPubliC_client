import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { IRequestLoginData, IUser } from './type';

export class StoreAuthorizationAction {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  public *authorization(actionIfDone: () => void) {
    const requestData: IRequestLoginData = {
      login: this.root.storeAuth.state.auth.login.value,
      password: this.root.storeAuth.state.auth.password.value,
    };

    try {
      const response: AxiosResponse<IUser> =
        yield extendAxios.post<AxiosResponse>('/login', requestData);
      this.root.storeAuth.state.userData = response.data;
      this.root.storeAuth.status.set('auth', 'done');
      actionIfDone();
    } catch (error) {
      this.root.storeAuth.status.set('auth', 'error');
    }
  }
}
