import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import TransitionCustom from '../blocks/transition/Transition';
import { ITransitionCustomLayout } from '../blocks/transition/type';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import PopupSelectMap from '../popup/select/map/Map';
import PopupSelectPoints from '../popup/select/points/Points';
import Header from './header/Header';

const Layout = observer(() => {
  const { storePopup } = useRootStore();
  const productNodeRef = useRef<HTMLDivElement>(null);
  const taskNodeRef = useRef<HTMLDivElement>(null);
  const mapNodeRef = useRef<HTMLDivElement>(null);
  const pointsNodeRef = useRef<HTMLDivElement>(null);

  const POPUPS: ITransitionCustomLayout[] = [
    {
      name: 'productFormPopup',
      trigger: storePopup.productForm,
      nodeRef: productNodeRef,
      children: <PopupFormProduct />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'taskFormPopup',
      trigger: storePopup.taskForm,
      nodeRef: taskNodeRef,
      children: <PopupFormTask />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectMapPopup',
      trigger: storePopup.selectMap,
      nodeRef: mapNodeRef,
      children: <PopupSelectMap />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectPointsPopup',
      trigger: storePopup.selectPoints,
      nodeRef: pointsNodeRef,
      children: <PopupSelectPoints />,
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
