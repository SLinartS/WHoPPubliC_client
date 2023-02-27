export interface IHeaderLinks {
  icon: string;
  text: string;
  to: TToLinkType;
}

export type TToLinkType =
  | 'points'
  | 'map'
  | 'tasks'
  | 'products'
  | 'users'
  | 'performance-report';
