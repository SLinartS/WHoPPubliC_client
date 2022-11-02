import { FC, ReactNode } from 'react';

import RootStore from '../../store/root';
import { StoreContext } from './rootContext';

// only create the store once ( store is a singleton)
const root = RootStore.getInstance();

interface RootStoreProps {
  children: ReactNode;
}

// create the provider component
export const RootStoreProvider: FC<RootStoreProps> = ({ children }) => (
  <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
);
