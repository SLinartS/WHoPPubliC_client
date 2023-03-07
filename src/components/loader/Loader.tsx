import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';

interface ILoaderProps {
  classes?: string;
  isError?: boolean;
}

const Loader: FC<ILoaderProps> = ({ classes, isError }) => {
  const [isDisplayError, setIsDisplayError] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisplayError(true);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`lds-facebook__shell ${classes}`}>
      {isError || isDisplayError ? (
        <p className='loader__error-message'>
          Ошибка загрузки данных. Повторите попытку позже
        </p>
      ) : (
        <div className='lds-facebook'>
          <div />
          <div />
          <div />
        </div>
      )}
    </div>
  );
};

export default observer(Loader);
