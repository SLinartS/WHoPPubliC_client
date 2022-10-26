import { IProperties } from "./propertiesBlock";

export interface IPropertiesOfPointBlockProps {
	classes?: string;
	properties: Array<IPropertiesOfPoint>;
}

export interface IPropertiesOfPoint {
	text: string;
}