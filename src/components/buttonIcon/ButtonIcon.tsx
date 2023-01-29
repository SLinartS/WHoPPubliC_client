import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface IButtonIconProps {
  src: string;
  clickHandler: () => void;
  alt?: string;
  classes?: string;
}

const ButtonIcon: FC<IButtonIconProps> = ({
  src,
  clickHandler,
  alt,
  classes,
}) => {
  return (
    <img
      className={`button-icon ${classes}`}
      src={src}
      alt={alt}
      onClick={clickHandler}
    />
  );
};

export default observer(ButtonIcon);
