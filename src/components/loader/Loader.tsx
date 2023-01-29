import './style.scss';

import { observer } from 'mobx-react-lite';
import { FC } from 'react';

interface ILoaderProps {
  classes?: string;
}

const Loader: FC<ILoaderProps> = ({ classes }) => {
  return (
    <div className={`lds-facebook__shell ${classes}`}>
      <div className='lds-facebook'>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default observer(Loader);