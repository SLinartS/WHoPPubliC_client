import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import appIcon from '../../../assets/images/app-icon.png';
import './style.scss';

const Header: FC = observer(() => (
  <>
    {/* if (userIsAuth) */}
    <header className='header'>
      <Link to='/'>
        <img
          className='header__app-icon'
          src={appIcon}
          alt='app icon'
        />
      </Link>
      <div className='header__user-info'>
        <p className='header__user-name'>Евгений Иванович Петров</p>
        <p className='header__user-role'>Администратор</p>
      </div>
      <nav className='header__nav'>
        <Link
          to='map'
          className='header__nav-link'
        >
          Карта
        </Link>
        <Link
          to='tasks'
          className='header__nav-link'
        >
          Задачи
        </Link>
        <Link
          to='products'
          className='header__nav-link'
        >
          Товары
        </Link>
        <Link
          to='accounts'
          className='header__nav-link'
        >
          Аккаунты
        </Link>
      </nav>
    </header>

    {/* {else}
			<header className='header header--no-auth'>
				<h2 className='header__app-name'>МИС «Склад»</h2>
			</header>
       */}
  </>
));

export default Header;
