export interface TProductsData {
	data: TProducts;
	tableHeader: Array<string>;
}

export type TProducts = Array<IProduct>

export interface IProduct {
	id: string;
	title: string;
	author: string;
	yearOfPublication: number;
	category: string;
	number: number;
	printDate: string;
}
