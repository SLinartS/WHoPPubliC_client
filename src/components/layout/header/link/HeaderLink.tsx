import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IHeaderLinkProps } from './type';

const HeaderLink: FC<IHeaderLinkProps> = observer(({ text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? 'header__nav-link header__nav-link--active'
          : 'header__nav-link'
      }
    >
      {text}
    </NavLink>
  );
});

export default HeaderLink;
