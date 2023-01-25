import { TMouseImgEventHandler } from '@gtypes/form/type';

export interface IIconButtonProps {
  eventHandler: TMouseImgEventHandler;
  iconType: TIconButtonTypes;
}

export type TIconButtonTypes = 'back' | 'reset' | 'close' | 'save';
