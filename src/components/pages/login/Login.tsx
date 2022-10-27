import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import appIcon from '../../../assets/images/app-icon.png';
import Button from '../../blocks/button/Button';
import './style.scss';

const Login: FC = observer(() => {
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
				<Button additionalСlasses='button--login' text='Войти' />
			</div>
		</main>
	);
});

export default Login;
