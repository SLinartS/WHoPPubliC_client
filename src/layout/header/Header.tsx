import './style.scss';

import appIcon from '@assets/icons/app.png';
import barsIcon from '@assets/icons/bars.svg';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import HeaderNav from './nav/Nav';

const Header: FC = () => {
  const { storeState } = useRootStore();

  function showPopupNavHandler(e: MouseEvent) {
    e.stopPropagation();
    storeState.interface.showPopupNav();
  }

  function hidePopupNavHandler() {
    storeState.interface.hidePopupNav();
  }

  return (
    <>
      <header
        className='header'
        onClick={hidePopupNavHandler}
      >
        <div className='header__info'>
          <Link to='/'>
            <img
              className='header__icon'
              src={appIcon}
              alt='app icon'
            />
          </Link>
          <div className='header__user'>
            <p className='header__user-name'>{storeState.user.userData.name}</p>
            <p className='header__user-role'>
              {storeState.user.userData.roleAlias}
            </p>
          </div>
        </div>
        <HeaderNav />

        <img
          onClick={(e) => showPopupNavHandler(e)}
          className='header__bar'
          src={barsIcon}
          alt='bar'
        />
      </header>
      {storeState.interface.getIsShowPopupNav() ? <HeaderNav isPopup /> : ''}
    </>
  );
};

export default observer(Header);
