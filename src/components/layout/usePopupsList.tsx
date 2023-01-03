import { useRef } from 'react';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import { ITransitionCustomLayout } from '../blocks/transition/type';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import PopupSelectMap from '../popup/select/map/Map';
import PopupSelectPoints from '../popup/select/points/Points';
import PopupSelectProduct from '../popup/select/product/Product';
import WindowConfirm from '../popup/window/confirm/Confirm';
import WindowInformation from '../popup/window/information/Information';

const usePopupList = () => {
  const { storePopup } = useRootStore();
  const productNodeRef = useRef<HTMLDivElement>(null);
  const taskNodeRef = useRef<HTMLDivElement>(null);
  const selectMapNodeRef = useRef<HTMLDivElement>(null);
  const selectPointsNodeRef = useRef<HTMLDivElement>(null);
  const selectProductsNodeRef = useRef<HTMLDivElement>(null);
  const windowConfirmNodeRef = useRef<HTMLDivElement>(null);
  const windowInformationNodeRef = useRef<HTMLDivElement>(null);

  const POPUPS: ITransitionCustomLayout[] = [
    {
      name: 'productFormPopup',
      trigger: storePopup.status.productFormStatus,
      nodeRef: productNodeRef,
      children: <PopupFormProduct />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'taskFormPopup',
      trigger: storePopup.status.taskFormStatus,
      nodeRef: taskNodeRef,
      children: <PopupFormTask />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectMapPopup',
      trigger: storePopup.status.selectMapStatus,
      nodeRef: selectMapNodeRef,
      children: <PopupSelectMap />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectPointsPopup',
      trigger: storePopup.status.selectPointsStatus,
      nodeRef: selectPointsNodeRef,
      children: <PopupSelectPoints />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'selectProductsPopup',
      trigger: storePopup.status.selectProductsStatus,
      nodeRef: selectProductsNodeRef,
      children: <PopupSelectProduct />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'windowConfirm',
      trigger: storePopup.status.windowConfirmStatus,
      nodeRef: windowConfirmNodeRef,
      children: <WindowConfirm />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'windowInformation',
      trigger: storePopup.status.windowInformationStatus,
      nodeRef: windowInformationNodeRef,
      children: <WindowInformation />,
      classNames: 'popup',
      timeout: 200,
    },
  ];

  return POPUPS;
};

export default usePopupList;
