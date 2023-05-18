import { IOption } from '@store/category/type';
import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { TReportType } from './type';

export class StoreFileType {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  private _fileTypes: IOption<TReportType>[] = [];

  public get fileTypes() {
    return this._fileTypes.slice().sort((a, b) => {
      return a.id - b.id;
    });
  }

  public set fileTypes(newFileTypes: IOption<TReportType>[]) {
    this._fileTypes = newFileTypes;
  }
}
