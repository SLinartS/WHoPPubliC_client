import { makeAutoObservable } from 'mobx';

import RootStore from '../../root';
import {
  IAddedProductListForTableData,
  IAddProductFormData,
  TAddedProductList,
} from './type';

export class AddProductFormStore {
  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this, {});
  }

  /*  List of products 
    added by the user */
  private _addedProductList: TAddedProductList = [];

  public get addedProductList() {
    return this._addedProductList;
  }

  public getAddedProductListForTable() {
    const productListForTable: IAddedProductListForTableData = {
      data: [],
      tableHeader: [
        'Артикул',
        'Название',
        'Автор',
        'Категория',
        'Количество',
        'Типография',
        'Издательство',
      ],
    };

    for (const product of this.addedProductList) {
      productListForTable.data.push({
        article: product.article,
        title: product.title,
        author: product.author,
        categoryId: product.categoryId,
        number: product.number,
        printingHouse: product.printingHouse,
        publishingHouse: product.publishingHouse,
      });
    }

    return productListForTable;
  }

  public addProductToList() {
    this._addedProductList.push({ ...this._formData });
  }

  public removeProductFromList(producArticle: string) {
    this._addedProductList = this._addedProductList.filter(
      (product) => product.article !== producArticle,
    );
  }

  public clearProductList() {
    this._addedProductList = [];
  }

  /*  Fields of the product
      addition form */
  private readonly initialFormData: IAddProductFormData = {
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

  private _formData: IAddProductFormData = this.initialFormData;

  public clearFormData() {
    this._formData = this.initialFormData;
  }

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

  public get categoryId() {
    return this._formData.categoryId;
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
