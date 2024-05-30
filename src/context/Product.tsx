import React, { createContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface ProductsDataContextInterface {
    productsData: Product[];
    isError: boolean;
    isLoading: boolean;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsData: [],
    isLoading: true,
    isError: false,
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products');

            try {
                if (response.ok) {
                    const data = await response.json();
                    setProductsData(data);
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
        productsData,
        isError,
        isLoading,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
