import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import Button from '../../../../blocks/button/Button';
import WindowHeader from '../../../../blocks/windowHeader/WindowHeader';

interface WindowConfirmTemplateProps {
  text: string;
  firstButtonClickHandler: () => void;
  secondButtonClickHandler: () => void;
}

const WindowConfirmTemplate: FC<WindowConfirmTemplateProps> = observer(
  ({ text, firstButtonClickHandler, secondButtonClickHandler }) => {
    return (
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
    );
  },
);

export default WindowConfirmTemplate;
