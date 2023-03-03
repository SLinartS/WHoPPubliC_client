import './style.scss';

import barsIcon from '@assets/icons/bars/bars-white.svg';
import logoutIcon from '@assets/icons/logout/logout-second.svg';
import appIcon from '@assets/images/app.png';
import ButtonIcon from '@components/buttonIcon/ButtonIcon';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import HeaderNav from './nav/Nav';

const Header: FC = () => {
  const { storeState, storeAuth } = useRootStore();
  const navigate = useNavigate();

  function showPopupNavHandler(e: MouseEvent) {
    e.stopPropagation();
    storeState.interface.showPopupNav();
  }

  function hidePopupNavHandler() {
    storeState.interface.hidePopupNav();
  }

  function logoutHandler() {
    storeAuth.action.logout(() => {
      navigate('/login');
    });
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
            <p className='header__user-name'>{storeAuth.state.userData.name}</p>
            <p className='header__user-role'>
              {storeAuth.state.userData.roleAlias}
            </p>
          </div>
          <ButtonIcon
            src={logoutIcon}
            classes='header__logout'
            alt='logout'
            clickHandler={logoutHandler}
          />
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
