import React, { createContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface ProductsDataContextInterface {
    productsList: Product[];
    isError: boolean;
    isLoading: boolean;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsList: [],
    isLoading: true,
    isError: false,
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products');

            try {
                if (response.ok) {
                    const data = await response.json();
                    setProductsList(data.products);
                    setIsError(false);
                    setIsLoading(false);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const contextValue = {
        productsList,
        isError,
        isLoading,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
