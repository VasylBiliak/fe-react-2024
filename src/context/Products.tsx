import React, { createContext, useCallback, useState } from 'react';

import { cards } from '@/data/db.json';
import type { Product } from '@/interfaces/Product';

import getFilteredCards from './DefaultData';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ma-backend-api.mocintra.com/api/v1/',
});

const defaultParameters = {
    limit: 8,
    offset: 0,
    categoryId: 0,
    title: '',
    sortOrder: 'asc',
};

interface ProductsDataContextInterface {
    productsList: Product[];
    isLoading: boolean;
    totalProducts: number;
    fetchProducts: (parameters?: { offset: number; sortOrder: string; limit: number; title: string; categoryId: string }) => void;
    fetchProductById: (productId: string | undefined) => Promise<void>;
    product?: Product;
}

export const ProductsDataContext = createContext<ProductsDataContextInterface>({
    productsList: [],
    isLoading: true,
    totalProducts: 0,
    fetchProducts: () => {},
    fetchProductById: async () => {},
});

interface ProductsDataContextProviderProps {
    children: React.ReactNode;
}

api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
);

export function ProductsDataContextProvider({ children }: ProductsDataContextProviderProps) {
    const [productsList, setProductsList] = useState<Product[]>([]);
    const [product, setProduct] = useState<Product>();
    const [totalProducts, setTotalProducts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async (parameters: Record<string, string | number> = defaultParameters) => {
        setIsLoading(true);
        const query = new URLSearchParams(parameters as any).toString();
        try {
            // Attempt to fetch products from the server
            const response = await api.get(`products?${query}`);
            const data = response.data;
            setProductsList(data.products);
            setTotalProducts(data.total);
        } catch {
            // Fallback to default data when the server is unavailable
            // Filters and paginates the local data to provide a consistent user experience
            const defaultCardsWithIds = await getFilteredCards(cards, query);
            setProductsList(defaultCardsWithIds.filteredCards);
            setTotalProducts(defaultCardsWithIds.total);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchProductById = useCallback(async (productId: string | undefined) => {
        setIsLoading(true);
        try {
            const response = await api.get(`products/${productId}`);
            const data = response.data;
            setProduct(data);
        } catch {
            const foundProduct = cards.find((card) => String(card.id) === productId);
            if (foundProduct) {
                setProduct(foundProduct);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const contextValue = {
        productsList,
        isLoading,
        fetchProducts,
        totalProducts,
        product,
        fetchProductById,
    };

    return <ProductsDataContext.Provider value={contextValue}>{children}</ProductsDataContext.Provider>;
}
