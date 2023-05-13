import SelectTable from '@components/selectTable/SelectTable';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { ReactNode, useCallback } from 'react';

import { useGetDataForSelects } from './useGetDataForSelects';

const excludeColumns = [
  'imageUrl',
  'categoryId',
  'typeId',
  'regularityId',
  'audienceId',
];

export function useGetSelects() {
  const { storeProduct } = useRootStore();
  const getDataForSelects = useGetDataForSelects();

  return useCallback((): ReactNode[] => {
    const selectNodes: ReactNode[] = [];
    if (
      storeProduct.state.products.data.length &&
      storeProduct.state.products.data[0]
    ) {
      selectNodes.push(
        getDataForSelects().map(
          ([key, item]) =>
            !excludeColumns.includes(key) && (
              <SelectTable
                key={key + item.value + item.alias}
                checkMarkValue={key}
                alias={item.alias}
                value={String(item.value)}
                mark='products'
              />
            ),
        ),
      );
    } else {
      selectNodes.push(<p key='0'>Отсутствуют данные</p>);
    }
    return selectNodes;
  }, []);
}
