import React from 'react';
import { Link } from 'react-router-dom';
import appIcon from '../../../assets/images/app-icon.png';

const Header = () => {
	return (
		<header className='header'>
			{/* if (userIsAuth) */}
			<img className='header__app-icon' src={appIcon} alt='app icon' />
			<div className='header__user-info'>
				<p className='header__user-name'>Евгений Иванович Петров</p>
				<p className='header__user-role'>Администратор</p>
			</div>
			<nav className='header__nav'>
				<Link to={'map'} className='header__nav-link'>
					Карта
				</Link>
				<Link to={'tasks'} className='header__nav-link'>
					Задачи
				</Link>
				<Link to={'products'} className='header__nav-link'>
					Товары
				</Link>
				<Link to={'accounts'} className='header__nav-link'>
					Аккаунты
				</Link>
			</nav>

			{/* else 
      <h2 className="header__app-name">МИС «Склад»</h2>
      */}
		</header>
	);
};

export default Header;
