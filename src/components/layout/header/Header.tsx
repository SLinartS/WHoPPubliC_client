import { observer } from 'mobx-react-lite';
import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import appIcon from '../../../assets/icons/app.png';
import barsIcon from '../../../assets/icons/bars.svg';
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

  if (storeState.interface.getIsViewHeader()) {
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
              <p className='header__user-name'>Евгений Иванович Петров</p>
              <p className='header__user-role'>Администратор</p>
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
  }
  return (
    <header className='header header--no-auth'>
      <h2 className='header__app-name'>МИС «Склад»</h2>
    </header>
  );
});

export default Header;
