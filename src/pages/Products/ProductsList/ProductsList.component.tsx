import React from 'react';
import { LoadingMessage } from '@/components/Messages/LoadingMessage.component';
import { NoFoundMessage } from '@/components/Messages/NoFoundMessage.component';

import { ProductCard } from '../ProductCard/ProductCard.component';
import styles from './ProductsList.module.css';

interface ProductsListProps {
    productsList: any[];
    isLoading: boolean;
    isMobile: boolean;
}

export function ProductsList({ productsList, isLoading, isMobile }: ProductsListProps) {
    if (isLoading) {
        return isMobile ? <></> : LoadingMessage();
    }
    if (productsList.length === 0) {
        return NoFoundMessage();
    }

    return (
        <div className={styles.product}>
            {productsList.map((product, index) => (
                <ProductCard key={product.id} productData={product} />
            ))}
        </div>
    );
}
