import { makeAutoObservable } from 'mobx';
import { addProductFormData } from '../../types/store';
import RootStore from '../root';

export class AddProductFormStore {
	private rootStore: RootStore;

	constructor(rootStore: RootStore) {
		makeAutoObservable(this, {});
		this.rootStore = rootStore;
	}
	

	public formData: addProductFormData = {
		article: '',
		title: '',
		author: '',
		category: '',
		yearOfPublication: '',
		number: '',
		printDate: '',
		printingHouse: '',
		publishingHouse: '',
		operatorLogin: '',
	};

	// public getField(fieldName: keyof addProductFormData) {
	// 	return this.formData[fieldName];
	// }

	// public setField(fieldName: keyof addProductFormData, fieldValue: number | string) {
	// 		this.formData[fieldName] = fieldValue;
		
	// }
	


	public get article() {
		return this.formData.article;
	}
	public get title() {
		return this.formData.title;
	}
	public get author() {
		return this.formData.author;
	}
	public get category() {
		return this.formData.category;
	}
	public get yearOfPublication() {
		return this.formData.yearOfPublication;
	}
	public get number() {
		return this.formData.number;
	}
	public get printDate() {
		return this.formData.printDate;
	}
	public get printingHouse() {
		return this.formData.printingHouse;
	}
	public get publishingHouse() {
		return this.formData.publishingHouse;
	}
	public get operatorLogin() {
		return this.formData.operatorLogin;
	}

	// Setters
	public set article(article: string) {
		this.formData.article = article;
	}
	public set title(title: string) {
		this.formData.title = title;
	}
	public set author(author: string) {
		this.formData.author = author;
	}
	public set category(category: string) {
		this.formData.category = category;
	}
	public set yearOfPublication(yearOfPublication: string) {
		this.formData.yearOfPublication = yearOfPublication;
	}
	public set number(number: string) {
		this.formData.number = number;
	}
	public set printDate(printDate: string) {
		this.formData.printDate = printDate;
	}
	public set printingHouse(printingHouse: string) {
		this.formData.printingHouse = printingHouse;
	}
	public set publishingHouse(publishingHouse: string) {
		this.formData.publishingHouse = publishingHouse;
	}
	public set operatorLogin(operatorLogin: string) {
		this.formData.operatorLogin = operatorLogin;
	}
}
