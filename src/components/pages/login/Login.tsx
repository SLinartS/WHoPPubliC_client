import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import appIcon from '../../../assets/icons/app.png';
import passwordIcon from '../../../assets/icons/password.svg';
import userIcon from '../../../assets/icons/user.svg';
import loginWarehouseImage from '../../../assets/images/login_warehouse.png';
import Button from '../../blocks/button/Button';
import CheckMark from '../../blocks/checkMark/CheckMark';

const LoginPage: FC = observer(() => {
  useEffect(() => {}, []);

  return (
    <main className='login'>
      <img
        className='login__left-image'
        src={loginWarehouseImage}
        alt='loginWaregouse'
      />
      <div className='login__container'>
        <div className='login__info-block'>
          <img
            className='login__app-icon'
            src={appIcon}
            alt='app icon'
          />
          <h2 className='login__app-name'>МИС «Склад»</h2>
        </div>
        <h3 className='login__title'>Авторизация</h3>
        <div className='login__inputs-block'>
          <input
            type='text'
            className='login__input'
            placeholder='Логин'
          />
          <img
            className='login__icon'
            src={userIcon}
            alt='user'
          />
          <input
            type='text'
            className='login__input'
            placeholder='Пароль'
          />
          <img
            className='login__icon'
            src={passwordIcon}
            alt='user'
          />
        </div>
        <div className='login__low-block'>
          <CheckMark
            value='rememberMe'
            text='Запомнить'
            mark='interface'
            classes='check-mark--login'
          />
          <Button
            classes='button--login'
            text='Войти'
          />
        </div>
      </div>
    </main>
  );
});

export default LoginPage;
