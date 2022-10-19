import { IProduct, TProducts } from '../products';
import { TAcceptanceTasks, TShipmentTasks, ITask } from '../tasks';

export interface ITableProps {
	dataList: TAcceptanceTasks | TShipmentTasks | TProducts;
}

export interface IRowProps {
	columns: ITask | IProduct;
	number: number;
}

export interface TableColumnProps {
	stroke: number | string;
}
