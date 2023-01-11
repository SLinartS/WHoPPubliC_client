import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';

import TransitionCustom from '../blocks/transition/Transition';
import Header from './header/Header';
import usePopupList from './usePopupsList';

const Layout = observer(() => {
  const POPUPS = usePopupList();

  const location = useLocation();

  const ROUTES_HIDE_HEADER = ['login'];

  return (
    <>
      {!ROUTES_HIDE_HEADER.includes(location.pathname.substring(1)) && (
        <Header />
      )}

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
