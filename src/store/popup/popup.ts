import { makeAutoObservable } from 'mobx';

import RootStore from '../root';

export class StorePopup {
  constructor(private readonly root: RootStore) {
    makeAutoObservable(this, {});
  }

  /*
    ProductForm
   */
  private _productForm: boolean = false;

  public get productForm() {
    return this._productForm;
  }

  public showProductForm() {
    this._productForm = true;
  }

  public hideProductForm() {
    this._productForm = false;
  }

  /*
    TaskForm
   */
  private _taskForm: boolean = false;

  public get taskForm() {
    return this._taskForm;
  }

  public showTaskForm() {
    this._taskForm = true;
  }

  public hideTaskForm() {
    this._taskForm = false;
  }

  /*
    SelectMap
   */
  private _selectMap: boolean = false;

  public get selectMap() {
    return this._selectMap;
  }

  public showSelectMap() {
    this._selectMap = true;
  }

  public hideSelectMap() {
    this._selectMap = false;
  }

  /*
    SelectPoints
   */
  private _selectPoints: boolean = false;

  public get selectPoints() {
    return this._selectPoints;
  }

  public showSelectPoints() {
    this._selectPoints = true;
  }

  public hideSelectPoints() {
    this._selectPoints = false;
  }
}
