import RootStore from '@store/root';
import { makeAutoObservable } from 'mobx';

export class StoreTableState {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  // for sort
  private _lastStatusEqual: boolean = false;

  public get lastStatusEqual() {
    return this._lastStatusEqual;
  }

  public isColumnsEqual() {
    this._lastStatusEqual =
      this._currentSortedColumn === this._previousSortedColumn;
    return this.lastStatusEqual;
  }

  private _previousSortedColumn: string = '0';

  private _currentSortedColumn: string = '1';

  public get currentSortedColumn() {
    return this._currentSortedColumn;
  }

  public set currentSortedColumn(value: string) {
    this._previousSortedColumn = this._currentSortedColumn;
    this._currentSortedColumn = value;
  }

  public get previousSortedColumn() {
    return this._previousSortedColumn;
  }

  // end block for sort
}
