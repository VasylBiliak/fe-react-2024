import React from 'react';

import { ProductCard } from '../ProductCard/ProductCard.component';

import styles from './ProductsList.module.css';

interface ProductsListProps {
    productsData: any[];
    isError: boolean;
    isLoading: boolean;
}

export function ProductsList({ productsData, isError, isLoading }: ProductsListProps) {
    if (isLoading) {
        return <div className={styles.product__event}>Loading...</div>;
    }

    if (isError) {
        return <div className={styles.product__event}>Error fetching products data...</div>;
    }

    if (productsData.length === 0) {
        return <div className={styles.product__event}>Sorry, no matches found...(</div>;
    }

    return (
        <div className={styles.product}>
            {productsData.map((product) => (
                <ProductCard key={product.id} productData={product} />
            ))}
        </div>
    );
}
