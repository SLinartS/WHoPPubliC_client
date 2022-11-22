import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import TransitionCustom from '../blocks/transition/Transition';
import { ITransitionCustomLayout } from '../blocks/transition/type';
import PopupFormMap from '../popup/form/map/Map';
import PopupFormPoints from '../popup/form/points/Points';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import WindowConfirm from '../popup/window/confirm/Confirm';
import Header from './header/Header';

const Layout = observer(() => {
  const { storePopup } = useRootStore();
  const productNodeRef = useRef<HTMLDivElement>(null);
  const taskNodeRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const pointsNodeRef = useRef<HTMLDivElement>(null);
  const windowConfirmNodeRef = useRef<HTMLDivElement>(null);

  const POPUPS: ITransitionCustomLayout[] = [
    {
      name: 'productFormPopup',
      trigger: storePopup.productFormStatus,
      nodeRef: productNodeRef,
      children: <PopupFormProduct />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'taskFormPopup',
      trigger: storePopup.taskFormStatus,
      nodeRef: taskNodeRef,
      children: <PopupFormTask />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectMapPopup',
      trigger: storePopup.selectMapStatus,
      nodeRef: mapNodeRef,
      children: <PopupFormMap />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectPointsPopup',
      trigger: storePopup.selectPointsStatus,
      nodeRef: pointsNodeRef,
      children: <PopupFormPoints />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'windowConfirm',
      trigger: storePopup.windowConfirmStatus,
      nodeRef: windowConfirmNodeRef,
      children: <WindowConfirm />,
      classNames: 'popup',
      timeout: 200,
    },
  ];

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
