import React, { useContext, useEffect, useState } from 'react';

import { Pagination } from '@/components/Pagination/Pagination.component';
import { ProductsList } from '@/components/ProductsList/ProductsList.component';
import { SearchBar } from '@/components/SearchBar/SearchBar.component';
import { ProductsDataContext } from '@/context/ProductsList';

import styles from './ProductsPage.module.css';

export function ProductsPage() {
    const { productsList, isError, isLoading, totalProducts, fetchProducts } = useContext(ProductsDataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryNumber, setCategoryNumber] = useState<string>('0');
    const [sort, setSort] = useState<string>('newest');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const itemsPerPage = 8;

    const handleFilterChange = (number: string) => {
        setCategoryNumber(number);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchProducts({
            limit: itemsPerPage,
            offset: (currentPage - 1) * itemsPerPage,
            categoryId: categoryNumber,
            title: searchQuery,
            sortOrder: sort === 'newest' ? 'asc' : 'desc',
        });
    }, [currentPage, categoryNumber, sort, searchQuery]);

    return (
        <section className={styles.wrapper_list}>
            <SearchBar setFilter={handleFilterChange} setSort={setSort} setSearchQuery={setSearchQuery} />
            <ProductsList productsList={productsList} isError={isError} isLoading={isLoading} />
            <Pagination page={currentPage} limit={itemsPerPage} total={totalProducts} setCurrentPage={setCurrentPage} />
        </section>
    );
}
