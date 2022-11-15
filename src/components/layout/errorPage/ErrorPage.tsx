import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import question404Image from '../../../assets/icons/404-question.png';
import Button from '../../blocks/button/Button';

const ErrorPage: FC = observer(() => {
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
});

export default ErrorPage;
