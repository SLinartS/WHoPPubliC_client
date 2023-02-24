import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { IHeaderLinks } from './type';

interface IHeaderLinkProps extends IHeaderLinks {
  isPopup?: boolean;
}

const HeaderLink: FC<IHeaderLinkProps> = ({
  icon,
  text,
  to,
  isPopup = false,
}) => {
  const [blockActiveStyle, setBlockActiveStyle] = useState<string>('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.substring(1) === to) {
      setBlockActiveStyle(
        `header__nav-block${isPopup ? '--popup' : ''}--active`,
      );
    } else {
      setBlockActiveStyle('');
    }
  }, [location]);

  return (
    <div
      className={`header__nav-block${
        isPopup ? '--popup' : ''
      } ${blockActiveStyle}`}
    >
      <Link
        to={to}
        className={`header__nav-link${isPopup ? '--popup' : ''}`}
      >
        <img
          className={`header__nav-icon${isPopup ? '--popup' : ''}`}
          src={icon}
          alt={text}
        />
        <p className={`header__nav-text${isPopup ? '--popup' : ''}`}>{text}</p>
      </Link>
    </div>
  );
};

export default observer(HeaderLink);
