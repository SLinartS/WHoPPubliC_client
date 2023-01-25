import './style.scss';

import backIcon from '@assets/icons/back.svg';
import closeIcon from '@assets/icons/close.svg';
import resetIcon from '@assets/icons/reset.svg';
import saveIcon from '@assets/icons/save.svg';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import { IIconButtonProps } from './type';

const IconButton: FC<IIconButtonProps> = ({ eventHandler, iconType }) => {
  function getIcon(): string {
    switch (iconType) {
      case 'back':
        return backIcon;
      case 'reset':
        return resetIcon;
      case 'close':
        return closeIcon;
      case 'save':
        return saveIcon;
      default:
        return '';
    }
  }
  return (
    <img
      className={`icon-button icon-button--${iconType}`}
      src={getIcon()}
      alt='save'
      onClick={eventHandler}
    />
  );
};

export default observer(IconButton);
