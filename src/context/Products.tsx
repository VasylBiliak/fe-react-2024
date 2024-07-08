import React, { createContext, useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import axios from 'axios';

import type { Product } from '@/interfaces/Product';

import 'react-toastify/dist/ReactToastify.css';

const api = axios.create({
    baseURL: 'https://ma-backend-api.mocintra.com/api/v1/',
});

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'An error occurred';
        toast.error(message);
        return Promise.reject(error);
    },
);

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
            const response = await api.get(`products?${query}`);
            const data = response.data;
            setProductsList(data.products);
            setTotalProducts(data.total);
            setIsError(false);
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
            const response = await api.get(`products/${productId}`);
            const data = response.data;
            setProduct(data);
            setIsError(false);
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

    return (
        <ProductsDataContext.Provider value={contextValue}>
            {children}
            <ToastContainer />
        </ProductsDataContext.Provider>
    );
}
