import { IProduct, TProducts } from '../../../store/popup/type';
import { ITask, TTasks } from '../../../store/tasks/type';

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
