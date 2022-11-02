export interface ITasks {
  data: Array<ITask>;
  tableHeader: Array<string>;
}

export interface ITask {
  id: number;
  article: string;
  deadlines: string;
  dateStart: string;
  dateEnd: string;
  operatorLogin: string;
}
