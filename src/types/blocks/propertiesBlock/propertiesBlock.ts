import { ChangeEventHandler } from 'react';
import { ISelectOptions } from './selectInput';

export interface IPropertiesBlockProps {
	classes: string;
	properties: Array<IProperties>;
}

export interface IPropertyHeadBlockProps {
	classes?: string;
	property: IProperties;
}

export interface IProperties {
	text: string;
	changeEvent: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
	value: string;
	selectOptions?: Array<ISelectOptions>;
}
