import { createContext } from 'react';

type SearchContextValue = {
    busqueda: string;
    setBusqueda: (busqueda: string) => void;
};

export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

