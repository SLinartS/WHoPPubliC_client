import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';

import { ILocationButtons } from '../type';

const BUTTON_VARIATIONS: ILocationButtons = {
  acceptance: {
    first: { type: 'acceptancePoint', text: 'Точки приёмки' },
    second: { type: 'floors', text: 'Склад' },
  },
  shipment: {
    first: { type: 'floors', text: 'Склад' },
    second: { type: 'shipmentPoint', text: 'Точки отгрузки' },
  },
  intra: {
    first: { type: 'floors', text: 'Склад' },
    second: { type: 'floors', text: 'Склад' },
  },
};

export const useGetButtonByTypeOfOpenedTask = () => {
  const { storeState } = useRootStore();
  return BUTTON_VARIATIONS[storeState.interface.currentTypeOfTask];
};
