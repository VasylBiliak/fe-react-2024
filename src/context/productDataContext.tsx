import React, { createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Product } from '@/interfaces/Product';

interface ProductDataContextInterface {
    product: Product | null;
    isError: boolean;
    isLoading: boolean;
}

export const ProductDataContext = createContext<ProductDataContextInterface>({
    product: null,
    isLoading: true,
    isError: false,
});

interface ProductDataContextProviderProps {
    children: React.ReactNode;
}

export function ProductDataContextProvider({ children }: ProductDataContextProviderProps) {
    const [product, setProduct] = useState<Product | null>(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        (async function () {
            try {
                const response = await fetch(`https://ma-backend-api.mocintra.com/api/v1/products/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                    setIsError(false);
                } else {
                    setIsError(true);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id]);

    const contextValue = {
        product,
        isError,
        isLoading,
    };

    return <ProductDataContext.Provider value={contextValue}>{children}</ProductDataContext.Provider>;
}
