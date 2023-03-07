import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

interface IPopupProps {
  children: ReactNode;
  type: string;
  classes: string;
}

const Popup: FC<IPopupProps> = ({ children, type, classes }) => {
  return (
    <>
      <div className='popup__background' />
      <div
        className={`popup popup__popup-${type} popup-${type} popup-${type}--${classes}`}
      >
        {children}
      </div>
    </>
  );
};

export default observer(Popup);
