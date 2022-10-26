import { ChangeEventHandler } from "react";


export interface ISelectFiledInputProps {
	options: Array<ISelectOptions>;
	value?: string;
	changeEvent?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export interface ISelectOptions {
	id: number;
	option: string;
}