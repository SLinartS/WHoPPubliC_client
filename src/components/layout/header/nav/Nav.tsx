import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import HeaderLink from '../link/HeaderLink';
import { HEADER_LINKS } from '../link/links';

interface INavProps {
  isPopup?: boolean;
}

const Nav: FC<INavProps> = observer(({ isPopup = false }) => {
  return (
    <nav className={`header__nav${isPopup ? '--popup' : ''}`}>
      {HEADER_LINKS.map(({ icon, text, to }) => (
        <HeaderLink
          key={to + text}
          icon={icon}
          text={text}
          to={to}
          isPopup={isPopup}
        />
      ))}
    </nav>
  );
});

export default Nav;
