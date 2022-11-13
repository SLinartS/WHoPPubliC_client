import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ITransitionCustomProps } from './type';

const TransitionCustom: FC<ITransitionCustomProps> = observer(
  ({ trigger, nodeRef, children, classNames, timeout }) => {
    return (
      <CSSTransition
        nodeRef={nodeRef}
        in={trigger}
        timeout={timeout}
        classNames={classNames}
        mountOnEnter
        unmountOnExit
      >
        <div
          ref={nodeRef}
          className='transition-shell'
        >
          {children}
        </div>
      </CSSTransition>
    );
  },
);

export default TransitionCustom;
