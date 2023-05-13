import { ITableObject } from '@components/table/type';
import { useRootStore } from '@helpers/RootStoreProvider/useRootStore';
import { TSelectedItems } from '@store/table/selectedItem/type';
import { TTaskType } from '@store/type';
import { useCallback } from 'react';

function sortingAlgorithm<T extends ITableObject>(
  a: T,
  b: T,
  key: keyof T,
  isReverse: boolean,
): number {
  if (a[key] && b[key]) {
    if (typeof a[key].value === 'string' && typeof b[key].value === 'string') {
      if (isReverse) {
        return -1 * String(a[key].value).localeCompare(String(b[key].value));
      }
      return String(a[key].value).localeCompare(String(b[key].value));
    }
    if (typeof a[key].value === 'number' && typeof b[key].value === 'number') {
      if (isReverse) {
        return Number(b[key].value) - Number(a[key].value);
      }
      return Number(a[key].value) - Number(b[key].value);
    }
    return 0;
  }
  return 0;
}

export function useSortData() {
  const { storeProduct, storeTable, storeTask, storeUser } = useRootStore();

  return useCallback((key: string, valuesType: keyof TSelectedItems) => {
    storeTable.state.currentSortedColumn = key;

    let isReverse = false;
    if (storeTable.state.isColumnsEqual()) {
      isReverse = true;
    }
    switch (valuesType) {
      case 'products':
        storeProduct.state.setNewProductsData(
          storeProduct.state.products.data
            .concat()
            .sort((a, b) => sortingAlgorithm(a, b, key, isReverse)),
        );
        break;
      case 'tasks': {
        const taskTypes: TTaskType[] = ['acceptance', 'intra', 'shipment'];
        taskTypes.forEach((taskType) => {
          storeTask.state.setTasks(
            taskType,
            storeTask.state
              .getTasks(taskType)
              .concat()
              .sort((a, b) => sortingAlgorithm(a, b, key, isReverse)),
          );
        });
        break;
      }
      case 'users':
        storeUser.state.users = storeUser.state.users
          .concat()
          .sort((a, b) => sortingAlgorithm(a, b, key, isReverse));
        break;
      default:
    }
    if (isReverse) {
      storeTable.state.currentSortedColumn = '1';
    }
  }, []);
}
