export interface IPropertiesBlockProps {
	classes: string;
	properties: Array<IProperties>;
}

export interface IProperties {
	text: string;
	inputOptions?: Array<string>;
}
