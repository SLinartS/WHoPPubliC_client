import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import {
  IRequestLoginData,
  IRequestLogoutData,
  IResponseUserData,
} from './type';

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
      const response: AxiosResponse<IResponseUserData> =
        yield extendAxios.post<AxiosResponse>('/login', requestData);
      this.root.storeAuth.state.userData = response.data.userData;
      localStorage.setItem('userData', JSON.stringify(response.data.userData));
      localStorage.setItem('accessToken', response.data.tokens.access);
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
      this.root.storeAuth.status.set('auth', 'done');
      actionIfDone();
    } catch (error) {
      this.root.storeAuth.status.set('auth', 'error');
    }
  }

  public *logout(actionIfDone: () => void) {
    const requestData: IRequestLogoutData = {
      userId: this.root.storeAuth.state.userData.id,
    };

    try {
      yield extendAxios.post<AxiosResponse>('/logout', requestData);
      this.root.storeAuth.state.clearUserData();
      this.root.storeAuth.status.set('auth', 'done');
      actionIfDone();
    } catch (error) {
      this.root.storeAuth.status.set('auth', 'error');
    }
  }
}
