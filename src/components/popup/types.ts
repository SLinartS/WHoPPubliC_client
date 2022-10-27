import { ChangeEvent } from 'react';

export type ChangeFieldEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;


export interface addTaskFormDataArrays {
	products: Array<string>;
	startPoints: Array<string>;
	endPoints: Array<string>;
}

export interface addTaskFormDataFields {
	title: string;
	dateStart: string;
	dateEnd: string;
	userId: string;
}

export interface addProductFormData {
	article: string;
	title: string;
	author: string;
	category: string;
	yearOfPublication: string;
	number: string;
	printDate: string;
	printingHouse: string;
	publishingHouse: string;
	userId: string;
	stored: string;
  taskTitle: string;
}
