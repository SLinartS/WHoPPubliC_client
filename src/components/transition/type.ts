import { ReactElement, ReactNode, RefObject } from 'react';

export interface ITransitionCustomProps {
  trigger: boolean;
  nodeRef: RefObject<HTMLDivElement>;
  children: ReactNode | ReactElement;
  classNames: string;
  timeout: number;
}

export interface ITransitionCustomLayout extends ITransitionCustomProps {
  type: string;
  name: string;
}
