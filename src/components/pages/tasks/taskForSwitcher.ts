import { TTaskType } from '../../../store/type';

interface TTaskTypesForSwitcher {
  type: TTaskType;
  text: string;
}

export const TASK_TYPES: TTaskTypesForSwitcher[] = [
  {
    type: 'acceptance',
    text: 'Распределение',
  },
  {
    type: 'intra',
    text: 'Внутрискладские',
  },
  {
    type: 'shipment',
    text: 'Отгрузка',
  },
];
