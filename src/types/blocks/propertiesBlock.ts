import { ChangeEventHandler } from 'react';

export interface IPropertiesBlockProps {
	classes: string;
	properties: Array<IProperties>;
}

export interface IPropertiesPointBlockProps {
	classes?: string;
	properties: Array<IProperties>;
}

export interface IPropertyHeadBlockProps {
	classes?: string;
	property: IProperties;
}

export interface IProperties {
	text: string;
	changeEvent?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
	selectOptions?: Array<ISelectOptions>;
}

export interface ISelectOptions {
	id: number;
	option: string;
}
