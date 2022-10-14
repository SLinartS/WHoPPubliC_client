import React from 'react';
import appIcon from '../../assets/images/app-icon.png';

const Login = () => {
	return (
		<main className='login'>
			<div className='login__container'>
				<img className='login__app-icon' src={appIcon} alt='app icon' />
				<div className='login__inputs-block'>
					<p className='login__label'>Логин</p>
					<input type='text' className='login__input' />
					<p className='login__label'>Пароль</p>
					<input type='text' className='login__input' />
				</div>
				<button className='login__button'>Войти</button>
			</div>
		</main>
	);
};

export default Login;
