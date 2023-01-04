import { observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';

import appIcon from '../../../assets/icons/app.png';
import passwordIcon from '../../../assets/icons/password.svg';
import userIcon from '../../../assets/icons/user.svg';
import Button from '../../blocks/button/Button';
import CheckMark from '../../blocks/checkMark/CheckMark';

const LoginPage: FC = observer(() => {
  useEffect(() => {}, []);

  return (
    <main className='login'>
      <div className='login__container'>
        <img
          className='login__app-icon'
          src={appIcon}
          alt='app icon'
        />
        <h3 className='login__title'>Авторизация</h3>
        <div className='login__inputs-block'>
          <img
            className='login__icon'
            src={userIcon}
            alt='user'
          />
          <input
            type='text'
            className='login__input'
            placeholder='Логин'
          />
          <img
            className='login__icon'
            src={passwordIcon}
            alt='user'
          />
          <input
            type='text'
            className='login__input'
            placeholder='Пароль'
          />
        </div>
        <div className='login__low-block'>
          <CheckMark
            value='rememberMe'
            text='Запомнить'
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
