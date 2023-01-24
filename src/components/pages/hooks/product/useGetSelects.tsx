import { ReactNode, useCallback } from 'react';

import { useRootStore } from '../../../../utils/RootStoreProvider/useRootStore';
import SelectTable from '../../../blocks/selectTable/SelectTable';
import { useGetDataForSelects } from './useGetDataForSelects';

export function useGetSelects() {
  const { storeProduct } = useRootStore();
  const getDataForSelects = useGetDataForSelects();

  return useCallback((): ReactNode[] => {
    const selectNodes: ReactNode[] = [];
    if (storeProduct.state.products.data[0]) {
      selectNodes.push(
        getDataForSelects().map(([key, item]) => (
          <SelectTable
            key={key + item.value + item.alias}
            checkMarkValue={key}
            alias={item.alias}
            value={String(item.value)}
            mark='products'
          />
        )),
      );
    } else {
      selectNodes.push(<p>Отсутствуют данные</p>);
    }
    return selectNodes;
  }, []);
}
