import { makeAutoObservable } from 'mobx';

import RootStore from '../root';
import { IAddProductFormData } from './type';

export class AddProductFormStore {
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

  private _formData: IAddProductFormData = {
    article: '',
    title: '',
    author: '',
    category: '',
    yearOfPublication: '',
    number: '',
    printDate: '',
    printingHouse: '',
    publishingHouse: '',
    userId: '',
    stored: '',
    taskTitle: '',
  };

  // Getters
  public get formData() {
    return this._formData;
  }

  public get article() {
    return this._formData.article;
  }

  public get title() {
    return this._formData.title;
  }

  public get author() {
    return this._formData.author;
  }

  public get category() {
    return this._formData.category;
  }

  public get yearOfPublication() {
    return this._formData.yearOfPublication;
  }

  public get number() {
    return this._formData.number;
  }

  public get printDate() {
    return this._formData.printDate;
  }

  public get printingHouse() {
    return this._formData.printingHouse;
  }

  public get publishingHouse() {
    return this._formData.publishingHouse;
  }

  public get userId() {
    return this._formData.userId;
  }

  public get stored() {
    return this._formData.stored;
  }

  public get taskTitle() {
    return this._formData.taskTitle;
  }

  // Setters
  public set article(article: string) {
    this._formData.article = article;
  }

  public set title(title: string) {
    this._formData.title = title;
  }

  public set author(author: string) {
    this._formData.author = author;
  }

  public set category(category: string) {
    this._formData.category = category;
  }

  public set yearOfPublication(yearOfPublication: string) {
    this._formData.yearOfPublication = yearOfPublication;
  }

  public set number(number: string) {
    this._formData.number = number;
  }

  public set printDate(printDate: string) {
    this._formData.printDate = printDate;
  }

  public set printingHouse(printingHouse: string) {
    this._formData.printingHouse = printingHouse;
  }

  public set publishingHouse(publishingHouse: string) {
    this._formData.publishingHouse = publishingHouse;
  }

  public set userId(userId: string) {
    this._formData.userId = userId;
  }

  public set taskTitle(taskTitle: string) {
    this._formData.taskTitle = taskTitle;
  }

  public set stored(stored: string) {
    this._formData.stored = stored;
  }
}
