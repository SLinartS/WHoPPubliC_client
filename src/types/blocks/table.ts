import { IProduct, TProducts } from '../products';
import { TAcceptanceTasks, TShipmentTasks, ITask, TTasks } from '../tasks';

export interface ITableProps {
	data: TTasks | TProducts;
	tableHeader: Array<string>;
}

export interface IRowProps {
	columns: ITask | IProduct;
	number: number;
}

export interface TableColumnProps {
	stroke: number | string;
}
