import performanceReportIcon from '@assets/icons/file.svg';
import mapIcon from '@assets/icons/map.svg';
import pointsIcon from '@assets/icons/points.svg';
import productsIcon from '@assets/icons/products.svg';
import tasksIcon from '@assets/icons/tasks.svg';
import usersIcon from '@assets/icons/users.svg';

import { IHeaderLinks } from './type';

export const HEADER_LINKS: IHeaderLinks[] = [
  {
    icon: pointsIcon,
    text: 'Точки',
    to: 'points',
  },
  {
    icon: mapIcon,
    text: 'Карта',
    to: 'map',
  },
  {
    icon: tasksIcon,
    text: 'Задачи',
    to: 'tasks',
  },
  {
    icon: productsIcon,
    text: 'Товары',
    to: 'products',
  },
  {
    icon: usersIcon,
    text: 'Аккаунты',
    to: 'users',
  },
  {
    icon: performanceReportIcon,
    text: 'Отчёты',
    to: 'performance-report',
  },
];
