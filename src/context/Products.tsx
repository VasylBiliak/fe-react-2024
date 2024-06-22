import React, { createContext, useCallback, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface ProductsDataContextInterface {
    productsList: Product[];
    isError: boolean;
    isLoading: boolean;
    totalProducts: number;
    fetchProducts: (parameters?: { offset: number; sortOrder: string; limit: number; title: string; categoryId: string }) => void;
    fetchProductById: (productId: string | undefined) => Promise<void>;
    product?: Product;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsList: [],
    isLoading: true,
    isError: false,
    totalProducts: 0,
    fetchProducts: () => {},
    fetchProductById: async () => {},
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>();
    const [totalProducts, setTotalProducts] = useState(0);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async (parameters: Record<string, string | number> = {}) => {
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
    }, []);

    const fetchProductById = useCallback(async (productId: string | undefined) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setProduct(data);
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
    }, []);

    const contextValue = {
        productsList,
        isError,
        isLoading,
        fetchProducts,
        totalProducts,
        product,
        fetchProductById,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
