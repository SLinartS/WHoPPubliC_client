import { ChangeEvent } from 'react';

export type ChangeFieldEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface addTaskFormDataArrays {
	products: Array<string>;
	points: Array<IPoint>;
	warehousePoints: Array<IWarehousePoint>
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

export interface IWarehousePoint {
	zoneId: string;
	sectionId: string;
	blockId: string;
	floorId: string;
}

export interface IPoint {
	pointId: string;
	type: TTypePoint;
}

export type TTypePoint = 'acceptance' | 'shipment';
