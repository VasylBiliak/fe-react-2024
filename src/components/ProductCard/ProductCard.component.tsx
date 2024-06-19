import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import cart from '@/assets/products/Cart.svg';
import { Cart } from '@/context/Cart';
import type { Product } from '@/interfaces/Product';

import headerStyles from '../Header/header.module.css';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    productData: Product;
}

export function ProductCard({ productData }: ProductCardProps) {
    const { cartData, handleAddToCart } = useContext(Cart);
    const navigate = useNavigate();

    const itemsQty = cartData.filter((item) => item.title === productData.title);

    function handleOpenProductPage() {
        navigate(`${productData.id}`);
    }
    return (
        <div className={styles.product_card}>
            <div className={styles.wrapper}>
                <div className={styles.wrapper} onClick={handleOpenProductPage}>
                    <img className={styles.img} src={productData.images[0]} alt="Product" />
                    <h3 className={styles.title}>{productData.title}</h3>
                </div>
                <div className={styles.inf}>
                    <div className={styles.price}>
                        {productData.price} <span> ₴</span>
                    </div>
                    <button className={`${styles.wrapper_cart}`} onClick={() => handleAddToCart(productData)}>
                        {itemsQty.length > 0 && <span className={headerStyles.product_quantity}>{itemsQty.length}</span>}
                        <img src={cart} alt="Cart" width="24px" height="24px" />
                    </button>
                </div>
            </div>
        </div>
    );
}
