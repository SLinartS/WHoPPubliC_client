import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import { TInformationOfViewLocation } from './type';

interface IButtonVariation {
  [label: string]: {
    first: {
      type: TInformationOfViewLocation;
      text: string;
    };
    second: {
      type: TInformationOfViewLocation;
      text: string;
    };
  };
}

const BUTTON_VARIATIONS: IButtonVariation = {
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
  return BUTTON_VARIATIONS[storeState.interface.getCurrentTypeOfTask()];
};
