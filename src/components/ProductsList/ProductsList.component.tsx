import React, { useContext } from 'react';

import { ProductsDataContext } from '@/context/Product';

import { ProductCard } from '../ProductCard/ProductCard.component';
import { SearchBar } from '../SearchBar/SearchBar.component';

import styles from './ProductsList.module.css';

export function ProductsList() {
    const { productsData } = useContext(ProductsDataContext);

    return (
        <section className={styles.wrapper_list}>
            <SearchBar />
            {/* <Pagination />*/}
            <div className={styles.product}>
                {productsData.map((productData) => (
                    <ProductCard key={productData.title} productData={productData} />
                ))}
            </div>
        </section>
    );
}
