import { IProduct, TProducts } from "../../../types/products";
import { ITask, TTasks } from "../../pages/tasks/types";


export interface ITableProps {
	data: TTasks | TProducts;
	tableHeader: Array<string>;
	classes?: string;
}

export interface IRowProps {
	columns: ITask | IProduct;
}

export interface TableColumnProps {
	text: number | string;
}
