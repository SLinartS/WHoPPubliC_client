import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { Outlet } from 'react-router-dom';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import TransitionPopup from '../blocks/transition/popup/TransitionPopup';
import { ITransitionPopupLayout } from '../blocks/transition/popup/type';
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

  const POPUPS: ITransitionPopupLayout[] = [
    {
      name: 'productFormPopup',
      trigger: storePopup.productForm,
      nodeRef: productNodeRef,
      children: <PopupFormProduct />,
    },
    {
      name: 'taskFormPopup',
      trigger: storePopup.taskForm,
      nodeRef: taskNodeRef,
      children: <PopupFormTask />,
    },
    {
      name: 'selectMapPopup',
      trigger: storePopup.selectMap,
      nodeRef: mapNodeRef,
      children: <PopupSelectMap />,
    },
    {
      name: 'selectPointsPopup',
      trigger: storePopup.selectPoints,
      nodeRef: pointsNodeRef,
      children: <PopupSelectPoints />,
    },
  ];

  return (
    <>
      <Header />
      <Outlet />
      {POPUPS.map(({ name, trigger, nodeRef, children }) => (
        <TransitionPopup
          key={name}
          trigger={trigger}
          nodeRef={nodeRef}
        >
          {children}
        </TransitionPopup>
      ))}
    </>
  );
});

export default Layout;
