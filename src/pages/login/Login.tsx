import './style.scss';

import passwordIcon from '@assets/icons/password/password.svg';
import passwordErrorIcon from '@assets/icons/password/password-fourth.svg';
import userIcon from '@assets/icons/user/user.svg';
import userErrorIcon from '@assets/icons/user/user-fourth.svg';
import appIcon from '@assets/images/app.png';
import Button from '@components/button/Button';
import CheckMark from '@components/checkMark/CheckMark';
import AssembledBlockFieldInput from '@components/form/assembled/BlockFieldInput';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IAuthorizationData } from '@store/authorization/type';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loginWarehouseImage from '../../assets/images/login-warehouse.png';
import { useIsLoginErrors } from '../hooks/errors/useIsLoginErrors';

const LoginPage: FC = () => {
  const { storeAuth } = useRootStore();
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false);
  const imgRefs = {
    login: useRef<HTMLImageElement>(null),
    password: useRef<HTMLImageElement>(null),
  };
  const [loginError, setLoginError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const isLoginErrors = useIsLoginErrors();
  const navigate = useNavigate();

  function changeFieldHandler(
    newValue: string,
    fieldName: keyof IAuthorizationData,
  ) {
    storeAuth.state.setAuthField(fieldName, newValue);
  }

  function onFocusHandler(
    status: boolean,
    additionalInfo: keyof typeof imgRefs,
    isHaveValue: boolean,
  ) {
    if (status || isHaveValue) {
      imgRefs[additionalInfo].current?.classList.add('login__icon--active');
    } else {
      imgRefs[additionalInfo].current?.classList.remove('login__icon--active');
    }
  }

  async function loginHandler() {
    if (!isLoginErrors()) {
      setIsSubmitButtonDisabled(true);
      await storeAuth.action.authorization(() => {
        navigate('/');
        storeAuth.state.clearAuth();
      });
      setIsSubmitButtonDisabled(false);
    }
  }

  useEffect(() => {
    const { errors } = storeAuth.state.auth.login;
    if (errors && errors.length && errors[0] && errors[0].length) {
      imgRefs.login.current?.classList.add('login__icon--error');
      setLoginError(true);
    } else {
      imgRefs.login.current?.classList.remove('login__icon--error');
      setLoginError(false);
    }
  }, [storeAuth.state.auth.login.errors]);

  useEffect(() => {
    const { errors } = storeAuth.state.auth.password;
    if (errors && errors.length && errors[0] && errors[0].length) {
      imgRefs.password.current?.classList.add('login__icon--error');
      setPasswordError(true);
    } else {
      imgRefs.password.current?.classList.remove('login__icon--error');
      setPasswordError(false);
    }
  }, [storeAuth.state.auth.password.errors]);

  return (
    <main className='login'>
      <img
        draggable='false'
        className='login__left-image'
        src={loginWarehouseImage}
        alt='loginWarehouse'
      />
      <div className='login__container'>
        <div className='login__info-block'>
          <img
            draggable='false'
            className='login__app-icon'
            src={appIcon}
            alt='app icon'
          />
          <h2 className='login__app-name'>МИС «Склад»</h2>
        </div>
        <h3 className='login__title'>Авторизация</h3>
        <div className='login__inputs-block'>
          <img
            ref={imgRefs.login}
            draggable='false'
            className='login__icon'
            src={loginError ? userErrorIcon : userIcon}
            alt='user'
          />
          <AssembledBlockFieldInput
            value={storeAuth.state.auth.login.value}
            errors={storeAuth.state.auth.login.errors}
            changeHandler={changeFieldHandler}
            fieldName='login'
            typeForm='login'
            placeholder='Логин'
            classes='login__input'
            onFocusHandler={onFocusHandler}
            additionalInformation='login'
          />

          <img
            ref={imgRefs.password}
            draggable='false'
            className='login__icon'
            src={passwordError ? passwordErrorIcon : passwordIcon}
            alt='user'
          />
          <AssembledBlockFieldInput
            value={storeAuth.state.auth.password.value}
            errors={storeAuth.state.auth.password.errors}
            changeHandler={changeFieldHandler}
            fieldName='password'
            typeForm='login'
            placeholder='Пароль'
            classes='login__input'
            onFocusHandler={onFocusHandler}
            additionalInformation='password'
            inputType='password'
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
            clickHandler={loginHandler}
            isDisabled={isSubmitButtonDisabled}
          />
        </div>
      </div>
    </main>
  );
};

export default observer(LoginPage);
