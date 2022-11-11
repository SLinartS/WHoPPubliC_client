import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ITransitionPopupProps } from './type';

const TransitionPopup: FC<ITransitionPopupProps> = observer(
  ({ trigger, nodeRef, children }) => {
    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={trigger}
        timeout={200}
        classNames='popup'
        mountOnEnter
        unmountOnExit
      >
        <div
          ref={nodeRef}
          className='popup-transition-shell'
        >
          {children}
        </div>
      </CSSTransition>
    );
  },
);

export default TransitionPopup;
