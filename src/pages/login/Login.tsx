import './style.scss';

import appIcon from '@assets/icons/app.png';
import passwordIcon from '@assets/icons/password.svg';
import userIcon from '@assets/icons/user.svg';
import Button from '@components/button/Button';
import CheckMark from '@components/checkMark/CheckMark';
import BlockFieldInput from '@components/form/assembled/BlockFieldInput';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { IAuthorizationData } from '@store/authorization/type';
import { observer } from 'mobx-react-lite';
import { FC, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loginWarehouseImage from '../../assets/images/login-warehouse.png';
import { useIsLoginError } from '../hooks/errors/useIsUserErrors';

const LoginPage: FC = () => {
  const { storeAuth, storePopup } = useRootStore();
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
    useState<boolean>(false);
  const imgRefs = {
    login: useRef<HTMLImageElement>(null),
    password: useRef<HTMLImageElement>(null),
  };
  const isLoginError = useIsLoginError();
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

  function loginHandler() {
    if (!isLoginError()) {
      setIsSubmitButtonDisabled(true);
      storeAuth.action.authorization(() => {
        navigate('/');
        storeAuth.state.clearAuth();
        setIsSubmitButtonDisabled(false);
      });
    } else {
      storePopup.form.state.isDisplayDefaultErrors = true;
    }
  }

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
            src={userIcon}
            alt='user'
          />
          <BlockFieldInput
            value={storeAuth.state.auth.login.value}
            errors={storeAuth.state.auth.login.errors}
            changeHandler={changeFieldHandler}
            fieldName='login'
            typeForm=''
            placeholder='Логин'
            classes='login__input'
            onFocusHandler={onFocusHandler}
            additionalInformation='login'
          />

          <img
            ref={imgRefs.password}
            draggable='false'
            className='login__icon'
            src={passwordIcon}
            alt='user'
          />
          <BlockFieldInput
            value={storeAuth.state.auth.password.value}
            errors={storeAuth.state.auth.password.errors}
            changeHandler={changeFieldHandler}
            fieldName='password'
            typeForm=''
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
