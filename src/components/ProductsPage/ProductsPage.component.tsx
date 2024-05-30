import React, { useContext, useState } from 'react';

import { Pagination } from '@/components/Pagination/Pagination.component';
import { ProductsList } from '@/components/ProductsList/ProductsList.component';
import { ProductsDataContext } from '@/context/Product';
import { useFilteredProducts, usePaginatedProducts, useSearchedProducts, useSortedProducts } from '@/hooks/productsHooks';

import { SearchBar } from '../SearchBar/SearchBar.component';

import styles from './ProductsPage.module.css';

export function ProductsPage() {
    const { productsData, isError, isLoading } = useContext(ProductsDataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<string[]>([]);
    const [sort, setSort] = useState<string>('newest');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const itemsPerPage = 7;

    const filteredProducts = useFilteredProducts(productsData, filters);
    const searchedProducts = useSearchedProducts(filteredProducts, searchQuery);
    const sortedProducts = useSortedProducts(searchedProducts, sort);
    const paginatedProducts = usePaginatedProducts(sortedProducts, currentPage, itemsPerPage);

    const handleFilterChange = (filter: string) => {
        setFilters((previousFilters) =>
            previousFilters.includes(filter) ? previousFilters.filter((f) => f !== filter) : [...previousFilters, filter],
        );
        setCurrentPage(1);
    };

    return (
        <section className={styles.wrapper_list}>
            <SearchBar setFilter={handleFilterChange} setSort={setSort} setSearchQuery={setSearchQuery} />
            <ProductsList productsData={paginatedProducts} isError={isError} isLoading={isLoading} />
            <Pagination page={currentPage} limit={itemsPerPage} total={sortedProducts.length} setCurrentPage={setCurrentPage} />
        </section>
    );
}
