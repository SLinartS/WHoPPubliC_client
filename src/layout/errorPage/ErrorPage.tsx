import './style.scss';

import question404Image from '@assets/images/404-question.png';
import Button from '@components/button/Button';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: FC = () => {
  const navigate = useNavigate();

  function goBackButtonHandler() {
    navigate(-1);
  }

  return (
    <main className='error-page'>
      <p className='error-page__text'>Как вы сюда попали?</p>
      <img
        className='error-page__image'
        src={question404Image}
        alt='404 Error'
      />
      <Button
        text='Вернуться назад'
        clickHandler={goBackButtonHandler}
      />
    </main>
  );
};

export default observer(ErrorPage);
