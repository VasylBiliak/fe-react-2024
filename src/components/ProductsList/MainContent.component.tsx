import React, { useContext, useState } from 'react';

import { Pagination } from '@/components/Pagination/Pagination.component';
import { ProductsList } from '@/components/ProductsList/ProductsList.component';
import { ProductsDataContext } from '@/context/Product';

import { SearchBar } from '../SearchBar/SearchBar.component';

import styles from './ProductsList.module.css';

export function MainContent() {
    const { productsData, isError, isLoading } = useContext(ProductsDataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState<string | null>(null);
    const [sort, setSort] = useState<string>('newest');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const itemsPerPage = 7;

    const filteredProducts = filter ? productsData.filter((product) => product.category.name === filter) : productsData;

    const searchedProducts = searchQuery
        ? filteredProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
        : filteredProducts;

    const sortedProducts = searchedProducts.sort((a, b) => {
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

    const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section className={styles.wrapper_list}>
            <SearchBar setFilter={setFilter} setSort={setSort} setSearchQuery={setSearchQuery} />
            <ProductsList productsData={paginatedProducts} isError={isError} isLoading={isLoading} />
            <Pagination page={currentPage} limit={itemsPerPage} total={searchedProducts.length} setCurrentPage={setCurrentPage} />
        </section>
    );
}
