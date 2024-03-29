import './style.scss';

import welcomeIcon from '@assets/images/welcome.svg';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

const MainPage: FC = () => {
  const { storeAuth } = useRootStore();

  function getName() {
    return storeAuth.state.userData.name.split(' ').slice(0, 2).join(' ');
  }

  return (
    <main className='main-page'>
      <img
        className='main-page__welcome-icon'
        src={welcomeIcon}
        alt='welcome'
      />
      <p className='main-page__username'>Добрый день, {getName()}</p>
    </main>
  );
};

export default observer(MainPage);
