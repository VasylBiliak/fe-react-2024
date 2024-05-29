import React, { createContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface ProductsDataContextInterface {
    productsData: Product[];
    isErrorFetchingProductsData: boolean;
    isLoadingProductsData: boolean;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsData: [],
    isErrorFetchingProductsData: false,
    isLoadingProductsData: true,
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsData, setProductsData] = useState<Product[]>([]);
    const [isErrorFetchingProductsData, setIsErrorFetchingProductsData] = useState(false);
    const [isLoadingProductsData, setIsLoadingProductsData] = useState(true);
    // console.log(productsData);

    useEffect(() => {
        (async function () {
            const response = await fetch('https://ma-backend-api.mocintra.com/api/v1/products');

            try {
                if (response.ok) {
                    const data = await response.json();
                    setProductsData(data);
                    setIsErrorFetchingProductsData(false);
                    setIsLoadingProductsData(false);
                } else {
                    setIsErrorFetchingProductsData(true);
                    setIsLoadingProductsData(false);
                    throw new Error('Error fetching products data');
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const contextValue = {
        productsData,
        isErrorFetchingProductsData,
        isLoadingProductsData,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
