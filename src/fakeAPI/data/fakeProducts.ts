import { TProductsData } from '../../types/products';

export const fP: TProductsData = {
	data: [
		{
			id: 'ST-RU-0108-1',
			title: 'Учебное пособие по электротехнике «Пайка для особ...',
			author: 'Ширкидзе. А.М.',
			yearOfPublication: 2022,
			category: 'Учебный',
			number: 500,
			printDate: '12.05.2021',
		},
		{
			id: 'H-EN-0569-1',
			title: 'Роман «Из тленности бытия в рек...',
			author: 'Ширкидзе. А.М.',
			yearOfPublication: 2022,
			category: 'Учебный',
			number: 1500,
			printDate: '17.07.2021',
		},
	],
	tableHeader: [
		'№',
		'Артикул',
		'Название',
		'Автор',
		'Год',
		'Категория',
		'Число',
		'Дата печати',
	],
};
