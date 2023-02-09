import './style.scss';

import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import HeaderLink from '../link/HeaderLink';
import { HEADER_LINKS } from '../link/links';
import { IHeaderLinks, TToLinkType } from '../link/type';

interface INavProps {
  isPopup?: boolean;
}

const HeaderNav: FC<INavProps> = ({ isPopup = false }) => {
  const { storeState } = useRootStore();

  function getLinksByUserRole(): IHeaderLinks[] {
    const excludeLinks: TToLinkType[] = [];
    switch (storeState.user.userData.role) {
      case 'admin':
        break;
      case 'operator':
        excludeLinks.push('users');
        break;
      case 'worker':
        excludeLinks.push('users', 'products');
        break;
      default:
        excludeLinks.push('points', 'map', 'tasks', 'products', 'users');
    }
    return HEADER_LINKS.filter((link) => !excludeLinks.includes(link.to));
  }

  return (
    <nav className={`header__nav${isPopup ? '--popup' : ''}`}>
      {getLinksByUserRole().map(({ icon, text, to }) => (
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
};

export default observer(HeaderNav);
