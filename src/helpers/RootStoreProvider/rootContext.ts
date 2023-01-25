import RootStore from '@store/root';
import { createContext } from 'react';

// create the context
export const StoreContext = createContext<RootStore | undefined>(undefined);
