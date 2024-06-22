import React, { createContext, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface ProductsDataContextInterface {
    productsList: Product[];
    isError: boolean;
    isLoading: boolean;
    totalProducts: number;
    fetchProducts: (parameters?: {
        offset: number;
        sortOrder: string;
        limit: number;
        price_min: number;
        title: string;
        price_max: number;
        categoryId: string;
    }) => void;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsList: [],
    isLoading: true,
    isError: false,
    totalProducts: 0,
    fetchProducts: () => {},
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = async (parameters: Record<string, string | number> = {}) => {
        setIsLoading(true);
        const query = new URLSearchParams(parameters as any).toString();
        try {
            const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products?${query}`);
            if (response.ok) {
                const data = await response.json();
                setProductsList(data.products);
                setTotalProducts(data.total);
                setIsError(false);
            } else {
                setIsError(true);
            }
        } catch (error) {
            console.error(error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const contextValue = {
        productsList,
        isError,
        isLoading,
        fetchProducts,
        totalProducts,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
