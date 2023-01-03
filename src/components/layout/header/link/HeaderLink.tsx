import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { IHeaderLinks } from './type';

interface IHeaderLinkProps extends IHeaderLinks {
  isPopup?: boolean;
}

const HeaderLink: FC<IHeaderLinkProps> = observer(
  ({ icon, text, to, isPopup = false }) => {
    const [blockActiveStyle, setBlockActiveStyle] = useState<string>('');

    const location = useLocation();

    useEffect(() => {
      if (location.pathname.substring(1) === to) {
        setBlockActiveStyle('header__nav-block--active');
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
        <img
          className={`header__nav-icon${isPopup ? '--popup' : ''}`}
          src={icon}
          alt={text}
        />
        <NavLink
          to={to}
          className={`header__nav-link${isPopup ? '--popup' : ''}`}
        >
          {text}
        </NavLink>
      </div>
    );
  },
);

export default HeaderLink;
