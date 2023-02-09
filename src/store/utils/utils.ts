import RootStore from '@store/root';
import extendAxios from '@utils/extendAxios';
import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';

import { ICheckArticleResponse } from './type';

export class StoreUtils {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _article: string = '';

  public get article() {
    return this._article;
  }

  public *generateArticle(type: 'task' | 'product', actionIsDone: () => void) {
    try {
      const response: AxiosResponse<ICheckArticleResponse> =
        yield extendAxios.get<AxiosResponse>(`generate/article/${type}`);
      this._article = response.data.article;
      actionIsDone();
    } catch (error) {
      this._article = '< error generating the article >';
    }
  }
}
