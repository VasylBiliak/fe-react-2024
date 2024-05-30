import { useMemo } from 'react';

import type { Product } from '@/interfaces/Product';

export function useFilteredProducts(products: Product[], filters: string[] | null) {
    return useMemo(
        () => (filters && filters.length > 0 ? products.filter((product) => filters.includes(product.category.name)) : products),
        [products, filters],
    );
}

export function useSearchedProducts(products: Product[], searchQuery: string) {
    return useMemo(
        () => (searchQuery ? products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase())) : products),
        [products, searchQuery],
    );
}

export function useSortedProducts(products: Product[], sort: string) {
    return useMemo(() => {
        const sortedProducts = [...products]; // Create a copy of the products array
        sortedProducts.sort((a, b) => {
            switch (sort) {
                case 'highToLow': {
                    return b.price - a.price;
                }
                case 'lowToHigh': {
                    return a.price - b.price;
                }
                case 'newest': {
                    return new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime();
                }
                case 'oldest': {
                    return new Date(a.creationAt).getTime() - new Date(b.creationAt).getTime();
                }
                default: {
                    return 0;
                }
            }
        });
        return sortedProducts;
    }, [products, sort]);
}

export function usePaginatedProducts(products: Product[], currentPage: number, itemsPerPage: number) {
    return useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    }, [products, currentPage, itemsPerPage]);
}
