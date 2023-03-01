import RootStore from '@store/root';
import { IResponse } from '@store/type';
import extendAxios from '@utils/extendAxios';
import { AxiosError, AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import {
  IAuthorizationData,
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
      const response: AxiosResponse<
        IResponse<IResponseUserData, keyof IAuthorizationData>
      > = yield extendAxios.post<AxiosResponse>('/login', requestData);

      const { data } = response.data;
      this.root.storeAuth.state.userData = data.userData;
      localStorage.setItem('userData', JSON.stringify(data.userData));
      localStorage.setItem('accessToken', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);
      this.root.storeAuth.status.set('auth', 'done');
      actionIfDone();
    } catch (e) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse<
        IResponse<IResponseUserData, keyof IAuthorizationData>
      >;
      if (response.status === 404 && response.data.errors) {
        this.root.storeAuth.state.setAuthFieldError(response.data.errors);
      }
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
      localStorage.clear();
      this.root.storeAuth.status.set('auth', 'done');
      actionIfDone();
    } catch (error) {
      this.root.storeAuth.status.set('auth', 'error');
    }
  }
}
