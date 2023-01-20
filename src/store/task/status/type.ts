import { TStatus, TTaskType } from '../../type';

export type TTaskStatus = 'fetchOne' | 'delete' | 'add' | 'update';

export type TTaskFetch = { [key in TTaskType]: TStatus };
