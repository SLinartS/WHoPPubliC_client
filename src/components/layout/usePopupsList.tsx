import { useRef } from 'react';

import { useRootStore } from '../../utils/RootStoreProvider/useRootStore';
import { ITransitionCustomLayout } from '../blocks/transition/type';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import PopupSelectMap from '../popup/select/map/Map';
import PopupSelectPoints from '../popup/select/points/Points';
import PopupSelectProduct from '../popup/select/product/Product';
import PopupViewLocation from '../popup/view/location/Location';
import PopupViewTask from '../popup/view/task/Task';
import WindowConfirm from '../popup/window/confirm/Confirm';
import WindowInformation from '../popup/window/information/Information';

const usePopupList = () => {
  const { storePopup } = useRootStore();
  const formProductNodeRef = useRef<HTMLDivElement>(null);
  const formTaskNodeRef = useRef<HTMLDivElement>(null);
  const viewTaskNodeRef = useRef<HTMLDivElement>(null);
  const viewLocationNodeRef = useRef<HTMLDivElement>(null);
  const selectMapNodeRef = useRef<HTMLDivElement>(null);
  const selectPointsNodeRef = useRef<HTMLDivElement>(null);
  const selectProductsNodeRef = useRef<HTMLDivElement>(null);
  const windowConfirmNodeRef = useRef<HTMLDivElement>(null);
  const windowInformationNodeRef = useRef<HTMLDivElement>(null);

  const POPUPS: ITransitionCustomLayout[] = [
    {
      name: 'formProductPopup',
      trigger: storePopup.status.formProductStatus,
      nodeRef: formProductNodeRef,
      children: <PopupFormProduct />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'formTaskPopup',
      trigger: storePopup.status.formTaskStatus,
      nodeRef: formTaskNodeRef,
      children: <PopupFormTask />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'viewTaskPopup',
      trigger: storePopup.status.viewTaskStatus,
      nodeRef: viewTaskNodeRef,
      children: <PopupViewTask />,
      classNames: 'popup',
      timeout: 200,
    },
    {
      name: 'viewLocationPopup',
      trigger: storePopup.status.viewLocationStatus,
      nodeRef: viewLocationNodeRef,
      children: <PopupViewLocation />,
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
