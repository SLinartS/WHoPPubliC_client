import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import appIcon from '../../../assets/images/app-icon.png';
import HeaderLink from './link/HeaderLink';
import { IHeaderLinkProps } from './link/type';

const Header: FC = observer(() => {
  const HEADER_LINKS: IHeaderLinkProps[] = [
    {
      text: 'Карта',
      to: 'map',
    },
    {
      text: 'Задачи',
      to: 'tasks',
    },
    {
      text: 'Товары',
      to: 'products',
    },
    {
      text: 'Аккаунты',
      to: 'accounts',
    },
  ];

  return (
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
          {HEADER_LINKS.map((link) => (
            <HeaderLink
              key={link.to + link.text}
              text={link.text}
              to={link.to}
            />
          ))}
        </nav>
      </header>

      {/* {else}
			<header className='header header--no-auth'>
				<h2 className='header__app-name'>МИС «Склад»</h2>
			</header>
       */}
    </>
  );
});

export default Header;
