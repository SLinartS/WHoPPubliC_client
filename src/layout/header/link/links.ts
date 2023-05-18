import reportIcon from '@assets/icons/file/file-second.svg';
import mapIcon from '@assets/icons/map/map-second.svg';
import pointsIcon from '@assets/icons/points/points-second.svg';
import productsIcon from '@assets/icons/products/products-second.svg';
import tasksIcon from '@assets/icons/tasks/tasks-second.svg';
import usersIcon from '@assets/icons/users/users-second.svg';

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
    icon: reportIcon,
    text: 'Отчёты',
    to: 'reports',
  },
];
