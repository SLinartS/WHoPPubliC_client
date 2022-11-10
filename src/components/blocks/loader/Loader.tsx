import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const Loader: FC = observer(() => {
  return (
    <div className='lds-facebook__shell'>
      <div className='lds-facebook'>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
});

export default Loader;
