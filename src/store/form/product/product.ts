import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import { IProductFormData } from './type';

export class StoreFormProduct {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  List of products
      added by the user */
  private _productList: IProductFormData[] = [];

  public get productList() {
    return this._productList;
  }

  public addProductToList() {
    this._productList.push({ ...this._formData });
  }

  public removeProductFromList(producArticle: string) {
    this._productList = this._productList.filter(
      (product) => product.article !== producArticle,
    );
  }

  public clearProductList() {
    this._productList = [];
  }

  /*  Fields of the product
      addition form */
  private readonly initialFormData: IProductFormData = {
    article: '',
    title: '',
    author: '',
    yearOfPublication: '',
    number: '',
    printDate: '',
    printingHouse: '',
    publishingHouse: '',
    categoryId: '',
  };

  private _formData: IProductFormData = this.initialFormData;

  public clearFormData() {
    this._formData = this.initialFormData;
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

  public set categoryId(categoryId: string) {
    this._formData.categoryId = categoryId;
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
}
