import { ReactNode, RefObject } from 'react';

export interface ITransitionPopupProps {
  trigger: boolean;
  nodeRef: RefObject<HTMLDivElement>;
  children: ReactNode | React.ReactElement;
}

export interface ITransitionPopupLayout extends ITransitionPopupProps {
  name: string;
}
