import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

import TransitionCustom from '../blocks/transition/Transition';
import Header from './header/Header';
import usePopupList from './usePopupsList';

const Layout = observer(() => {
  const POPUPS = usePopupList();

  const location = useLocation();

  const ROUTES_HIDE_HEADER = ['login'];

  const pagesRef = useRef<HTMLDivElement>(null);

  const currentOutlet = useOutlet();

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
          >
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>

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
