import { ChangeEventHandler } from "react";
import { ISelectOptions } from "./propertiesBlock";

export interface ISelectInputProps {
	options: Array<ISelectOptions>;
	changeEvent?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
}
