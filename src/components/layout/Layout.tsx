import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

import TransitionCustom from '../blocks/transition/Transition';
import Header from './header/Header';
import usePopupList from './usePopupsList';

const Layout = observer(() => {
  const POPUPS = usePopupList();

  return (
    <>
      <Header />
      <Outlet />
      {POPUPS.map(
        ({ name, trigger, nodeRef, children, classNames, timeout }) => (
          <TransitionCustom
            key={name}
            trigger={trigger}
            nodeRef={nodeRef}
            classNames={classNames}
            timeout={timeout}
          >
            {children}
          </TransitionCustom>
        ),
      )}
    </>
  );
});

export default Layout;
