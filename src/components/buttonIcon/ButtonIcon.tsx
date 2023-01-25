import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IButtonIconProps {
  src: string;
  clickHandler: () => void;
  alt?: string;
}

const ButtonIcon: FC<IButtonIconProps> = ({ src, clickHandler, alt }) => {
  return (
    <img
      className='button-icon'
      src={src}
      alt={alt}
      onClick={clickHandler}
    />
  );
};

export default observer(ButtonIcon);
