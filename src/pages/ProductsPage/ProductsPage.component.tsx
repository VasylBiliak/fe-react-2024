import React, { useCallback, useContext, useEffect, useState } from 'react';

import { Pagination } from '@/components/Pagination/Pagination.component';
import { ProductsList } from '@/components/ProductsList/ProductsList.component';
import { SearchBar } from '@/components/SearchBar/SearchBar.component';
import { ProductsDataContext } from '@/context/Products';
import type { Product } from '@/interfaces/Product';

const MOBILE_WIDTH = 900;
const SCROLL_THRESHOLD = 150;
const ITEMS_PER_PAGE = 8;

export function ProductsPage() {
    const { productsList, isError, isLoading, totalProducts, fetchProducts } = useContext(ProductsDataContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [categoryNumber, setCategoryNumber] = useState<string>('0');
    const [sort, setSort] = useState<string>('newest');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_WIDTH);
    const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < MOBILE_WIDTH);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchProducts({
            limit: ITEMS_PER_PAGE,
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
            categoryId: categoryNumber,
            title: searchQuery,
            sortOrder: sort === 'newest' ? 'asc' : 'desc',
        });
    }, [currentPage, categoryNumber, sort, searchQuery, fetchProducts]);

    useEffect(() => {
        if (isMobile) {
            setProducts((previousProducts) => [...previousProducts, ...productsList]);
        } else {
            setProducts(productsList);
        }
    }, [productsList, isMobile]);

    const handleFilterChange = (number: string) => {
        setCategoryNumber(number);
        setCurrentPage(1);
        setProducts([]);
    };

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - SCROLL_THRESHOLD &&
            !isLoading &&
            currentPage < totalPages
        ) {
            setCurrentPage(currentPage + 1);
        }
    }, [isLoading, currentPage, totalPages]);

    useEffect(() => {
        if (isMobile) {
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [isMobile, handleScroll]);

    return (
        <section>
            <SearchBar setFilter={handleFilterChange} setSort={setSort} setSearchQuery={setSearchQuery} />
            <ProductsList productsList={products} isError={isError} isLoading={isLoading} isMobile={isMobile} />
            {!isMobile && <Pagination page={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
        </section>
    );
}
