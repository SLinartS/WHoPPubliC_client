import { ITransitionCustomLayout } from '@components/transition/type';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { useRef } from 'react';

import PopupFormMap from '../popup/form/map/Map';
import PopupFormProduct from '../popup/form/product/Product';
import PopupFormTask from '../popup/form/task/Task';
import PopupFormUser from '../popup/form/user/User';
import PopupSelectMap from '../popup/select/map/Map';
import PopupSelectPoints from '../popup/select/points/Points';
import PopupSelectProduct from '../popup/select/product/Product';
import PopupSelectWorkSchedule from '../popup/select/workSchedule/WorkSchedule';
import PopupViewLocation from '../popup/view/location/Location';
import PopupViewMapProducts from '../popup/view/mapProducts/MapProducts';
import PopupViewTask from '../popup/view/task/Task';
import WindowConfirm from '../popup/window/confirm/Confirm';
import WindowInformation from '../popup/window/information/Information';

const usePopupList = () => {
  const { storePopup } = useRootStore();

  const POPUPS: ITransitionCustomLayout[] = [
    {
      type: 'form',
      name: 'add-product',
      trigger: storePopup.status.getStatus('formProduct'),
      nodeRef: useRef(null),
      children: <PopupFormProduct />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'form',
      name: 'add-task',
      trigger: storePopup.status.getStatus('formTask'),
      nodeRef: useRef(null),
      children: <PopupFormTask />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'form',
      name: 'add-map',
      trigger: storePopup.status.getStatus('formMap'),
      nodeRef: useRef(null),
      children: <PopupFormMap />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'form',
      name: 'add-user',
      trigger: storePopup.status.getStatus('formUser'),
      nodeRef: useRef(null),
      children: <PopupFormUser />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'view',
      name: 'task',
      trigger: storePopup.status.getStatus('viewTask'),
      nodeRef: useRef(null),
      children: <PopupViewTask />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'view',
      name: 'location',
      trigger: storePopup.status.getStatus('viewLocation'),
      nodeRef: useRef(null),
      children: <PopupViewLocation />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'view',
      name: 'map-products',
      trigger: storePopup.status.getStatus('viewMapProducts'),
      nodeRef: useRef(null),
      children: <PopupViewMapProducts />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'select',
      name: 'map',
      trigger: storePopup.status.getStatus('selectMap'),
      nodeRef: useRef(null),
      children: <PopupSelectMap />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'select',
      name: 'point',
      trigger: storePopup.status.getStatus('selectPoints'),
      nodeRef: useRef(null),
      children: <PopupSelectPoints />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'select',
      name: 'product',
      trigger: storePopup.status.getStatus('selectProducts'),
      nodeRef: useRef(null),
      children: <PopupSelectProduct />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'select',
      name: 'work-schedule',
      trigger: storePopup.status.getStatus('selectWorkSchedule'),
      nodeRef: useRef(null),
      children: <PopupSelectWorkSchedule />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'window',
      name: 'confirm',
      trigger: storePopup.status.getStatus('windowConfirm'),
      nodeRef: useRef(null),
      children: <WindowConfirm />,
      classNames: 'popup-wrapper',
      timeout: 200,
    },
    {
      type: 'window',
      name: 'information',
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
