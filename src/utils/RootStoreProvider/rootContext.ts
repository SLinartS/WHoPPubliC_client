import { createContext } from "react";
import RootStore from '../../store/root';

// create the context
export const StoreContext = createContext<RootStore | undefined>(undefined);