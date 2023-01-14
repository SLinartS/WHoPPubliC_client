import { observer } from 'mobx-react-lite';
import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import appIcon from '../../../assets/icons/app.png';
import barsIcon from '../../../assets/icons/bars.svg';
import { roleAlias } from '../../../utils/roleAlias/roleAlias';
import { useRootStore } from '../../../utils/RootStoreProvider/useRootStore';
import Nav from './nav/Nav';

const Header: FC = observer(() => {
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
            <p className='header__user-name'>
              {storeState.user.getUserData().name}
            </p>
            <p className='header__user-role'>
              {roleAlias(storeState.user.getUserData().role)}
            </p>
          </div>
        </div>
        <Nav />

        <img
          onClick={(e) => showPopupNavHandler(e)}
          className='header__bar'
          src={barsIcon}
          alt='bar'
        />
      </header>
      {storeState.interface.getIsShowPopupNav() ? <Nav isPopup /> : ''}
    </>
  );
});

export default Header;
