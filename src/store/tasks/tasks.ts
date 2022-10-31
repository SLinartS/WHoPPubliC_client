import { makeAutoObservable } from 'mobx';
import { AxiosResponse } from 'axios';
import RootStore from '../root';
import { TStatus } from '../type';
import { ITasksList } from './type';
import extendAxios from '../../utils/extendAxios';

export class TasksStore {
  private _rootStore!: RootStore;

  private get rootStore() {
    return this._rootStore;
  }

  private set rootStore(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, {});
    this.rootStore = rootStore;
  }

  // STATUS
  private _statusGetAcceptanceTasks: TStatus = 'pending';

  private _statusGetShipmentTasks: TStatus = 'pending';

  private _statusAddTask: TStatus = 'pending';

  private _statusTaskHasBeenAdded: boolean = false;

  // Getters
  public get statusGetAcceptanceTasks() {
    return this._statusGetAcceptanceTasks;
  }

  public get statusGetShipmentTasks() {
    return this._statusGetShipmentTasks;
  }

  public get statusAddTask() {
    return this._statusAddTask;
  }

  public get statusTaskHasBeenAdded() {
    return this._statusTaskHasBeenAdded;
  }

  // Setters
  public set statusGetAcceptanceTasks(newStatus: TStatus) {
    this._statusGetAcceptanceTasks = newStatus;
  }

  public set statusGetShipmentTasks(newStatus: TStatus) {
    this._statusGetShipmentTasks = newStatus;
  }

  public set statusAddTask(newStatus: TStatus) {
    this._statusAddTask = newStatus;
  }

  public set statusTaskHasBeenAdded(newStatus: boolean) {
    this._statusTaskHasBeenAdded = newStatus;
  }

  // DATA
  public tasksAccepranceList: ITasksList = { data: [], tableHeader: [] };

  public tasksShipmentList: ITasksList = { data: [], tableHeader: [] };

  public *getAcceptanceTasks() {
    try {
      const response: AxiosResponse<ITasksList> =
        yield extendAxios.get<ITasksList>('tasks/acceptance');
      this.tasksAccepranceList = response.data;
      this._statusGetAcceptanceTasks = 'done';
    } catch (error) {
      this._statusGetAcceptanceTasks = 'error';
    }
  }

  public *getShipmentTasks() {
    try {
      const response: AxiosResponse<ITasksList> =
        yield extendAxios.get<ITasksList>('tasks/shipment');
      this.tasksShipmentList = response.data;
      this.statusGetShipmentTasks = 'done';
    } catch (error) {
      this.statusGetShipmentTasks = 'error';
    }
  }

  public *addTask(typeId: string, taskTitle: string, userId: string) {
    try {
      const data = { title: taskTitle, typeId, userId };
      yield extendAxios.post('tasks', data);
      this.statusAddTask = 'done';
    } catch (error) {
      this.statusAddTask = 'error';
    }
  }
}
