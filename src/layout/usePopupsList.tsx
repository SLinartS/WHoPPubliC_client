import { ITransitionCustomLayout } from '@components/transition/type';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useRef } from 'react';

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

  const POPUPS: ITransitionCustomLayout[] = [
    {
      name: 'formProductPopup',
      trigger: storePopup.status.getStatus('formProduct'),
      nodeRef: useRef(null),
      children: <PopupFormProduct />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'formTaskPopup',
      trigger: storePopup.status.getStatus('formTask'),
      nodeRef: useRef(null),
      children: <PopupFormTask />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'viewTaskPopup',
      trigger: storePopup.status.getStatus('viewTask'),
      nodeRef: useRef(null),
      children: <PopupViewTask />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'viewLocationPopup',
      trigger: storePopup.status.getStatus('viewLocation'),
      nodeRef: useRef(null),
      children: <PopupViewLocation />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'selectMapPopup',
      trigger: storePopup.status.getStatus('selectMap'),
      nodeRef: useRef(null),
      children: <PopupSelectMap />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'selectPointsPopup',
      trigger: storePopup.status.getStatus('selectPoints'),
      nodeRef: useRef(null),
      children: <PopupSelectPoints />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'selectProductsPopup',
      trigger: storePopup.status.getStatus('selectProducts'),
      nodeRef: useRef(null),
      children: <PopupSelectProduct />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'windowConfirm',
      trigger: storePopup.status.getStatus('windowConfirm'),
      nodeRef: useRef(null),
      children: <WindowConfirm />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      name: 'windowInformation',
      trigger: storePopup.status.getStatus('windowInformation'),
      nodeRef: useRef(null),
      children: <WindowInformation />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
  ];

  return POPUPS;
};

export default usePopupList;
