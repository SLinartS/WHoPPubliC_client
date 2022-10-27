import { IProduct, TProducts } from "../../pages/products/types";
import { ITask, TTasks } from "../../pages/tasks/types";


export interface ITableProps {
	data: TTasks | TProducts;
	tableHeader: Array<string>;
	additionalСlasses?: string;
}

export interface IRowProps {
	columns: ITask | IProduct;
}

export interface TableColumnProps {
	additionalСlasses?: string;
	text: number | string;
}
