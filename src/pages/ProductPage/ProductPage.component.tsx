import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import clsx from 'clsx';

import cart from '@/assets/header/cart.svg';
import { ErrorMessage } from '@/components/Messages/ErrorMessage.component';
import { LoadingMessage } from '@/components/Messages/LoadingMessage.component';
import { NoFoundMessage } from '@/components/Messages/NoFoundMessage.component';
import { Cart } from '@/context/Cart';
import { fetchProduct } from '@/context/productDataContext';
import type { Product } from '@/interfaces/Product';

import styles from './productPage.module.css';

export const ProductPage: React.FC = () => {
    const { handleAddToCart } = useContext(Cart);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [imageTitle, setImageTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getProduct = async (productId: string) => {
            try {
                const data = await fetchProduct(productId);
                setProduct(data);
                setIsError(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            getProduct(id);
        }
    }, [id]);

    useEffect(() => {
        if (product) {
            setImageTitle(product.images[0]);
        }
    }, [product]);

    if (isLoading) {
        return LoadingMessage();
    }

    if (isError || !product) {
        return NoFoundMessage();
    }

    if (isError) {
        return ErrorMessage();
    }

    return (
        <section className={styles.product}>
            <div className={styles.product_image}>
                <div className={styles.secondary_images}>
                    {product.images.map((item) => (
                        <img
                            key={item}
                            className={clsx(styles.secondary_image, { [styles.active_image]: item === imageTitle })}
                            src={item}
                            alt="product"
                            onClick={() => setImageTitle(item)}
                        />
                    ))}
                </div>
                <img className={styles.title_image} src={imageTitle} alt="product" />
            </div>
            <div className={styles.product_txt}>
                <div className={styles.title}>
                    <h2 className={styles.product_title}>{product.title}</h2>
                    <span className={styles.product_category}>{product.category.name}</span>
                </div>
                <p className={styles.product_main_text}>{product.description}</p>
                <span className={styles.product_price}>
                    {product.price} <span> ₴</span>
                </span>
                <button className={styles.product_buy_button} onClick={() => product && handleAddToCart(product)}>
                    <img src={cart} alt="Cart" width="24px" height="24px" />
                    Add to cart
                </button>
            </div>
            <button className={styles.button_back} onClick={() => navigate(-1)}>
                <span>&lt;</span>
                Back
            </button>
        </section>
    );
};
