import Button from '@components/button/Button';
import WindowHeader from '@components/windowHeader/WindowHeader';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface WindowConfirmTemplateProps {
  text: string;
  firstButtonClickHandler: () => void;
  secondButtonClickHandler: () => void;
}

const WindowConfirmTemplate: FC<WindowConfirmTemplateProps> = ({
  text,
  firstButtonClickHandler,
  secondButtonClickHandler,
}) => {
  return (
    <>
      <div className='popup-window__background' />
      <div className='popup popup__popup-window popup-window popup-window--confirm'>
        <WindowHeader title={text} />
        <div className='popup-window__block'>
          <Button
            classes='button__confirm'
            text='Да'
            clickHandler={firstButtonClickHandler}
          />
          <Button
            classes='button__confirm'
            text='Нет'
            clickHandler={secondButtonClickHandler}
          />
        </div>
      </div>
    </>
  );
};

export default observer(WindowConfirmTemplate);
