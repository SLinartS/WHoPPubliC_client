export type TStatus = 'pending' | 'done' | 'error';

export interface addAcceptanceTaskFormData {
	title: string;
	dateStart: string;
	dateEnd: string;
	operatorLogin: string;
	productIds: Array<number>;
	startPointIds: Array<number>;
	endPointIds: Array<string>;
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
	operatorLogin: string;
}
