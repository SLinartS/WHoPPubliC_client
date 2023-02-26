import './style.scss';

import TransitionCustom from '@components/transition/Transition';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useRouterProtect } from '@hooks/useRouterProtect/useRouterProtect';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Popup from 'src/popup/Popup';

import Header from './header/Header';
import usePopupList from './usePopupsList';

const Layout = () => {
  const { storeState } = useRootStore();
  const POPUPS = usePopupList();
  const routerProtect = useRouterProtect();

  const location = useLocation();

  const ROUTES_HIDE_HEADER = ['login'];

  const pagesRef = useRef<HTMLDivElement>(null);

  const currentOutlet = useOutlet();

  function hidePopupNavHandler() {
    storeState.interface.hidePopupNav();
  }

  useEffect(() => {
    routerProtect(location.pathname.substring(1));
  }, [location.pathname]);

  return (
    <>
      {!ROUTES_HIDE_HEADER.includes(location.pathname.substring(1)) && (
        <Header />
      )}
      <SwitchTransition>
        <CSSTransition
          key={location.pathname}
          nodeRef={pagesRef}
          classNames='pages'
          timeout={200}
          unmountOnExit
        >
          <div
            ref={pagesRef}
            className='pages'
            onClick={hidePopupNavHandler}
          >
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>

      {POPUPS.map(
        ({ type, name, trigger, nodeRef, children, classNames, timeout }) => (
          <TransitionCustom
            key={type + name}
            trigger={trigger}
            nodeRef={nodeRef}
            classNames={classNames}
            timeout={timeout}
          >
            <Popup
              type={type}
              classes={name}
            >
              {children}
            </Popup>
          </TransitionCustom>
        ),
      )}
    </>
  );
};

export default observer(Layout);
