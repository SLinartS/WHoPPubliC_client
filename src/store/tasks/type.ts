export interface ITasks {
  data: ITask[];
  tableHeader: string[];
}

export interface ITask {
  id: number;
  article: string;
  deadlines: string;
  dateStart: string;
  dateEnd: string;
  operatorLogin: string;
}
