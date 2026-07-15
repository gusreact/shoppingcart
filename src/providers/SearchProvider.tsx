import { useState } from "react";
import { SearchContext } from "../context/SearchContext";

type CartSearchProps = {
    children: React.ReactNode;
};

export const SearchProvider = ({ children }: CartSearchProps) => {
    const [busqueda, setBusqueda] = useState("");
    return (
        <SearchContext.Provider value={{ busqueda, setBusqueda }}>
            {children}
        </SearchContext.Provider>
    );
};