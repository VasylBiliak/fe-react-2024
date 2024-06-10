import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import cart from '@/assets/header/cart.svg';
import { Cart } from '@/context/Cart';
import { ProductsDataContext } from '@/context/Product';

import styles from './productPage.module.css';

export const ProductPage: React.FC = () => {
    const { handleAddToCart } = useContext(Cart);
    const { productsData } = useContext(ProductsDataContext);
    const products = productsData;
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === Number(id));
    const [imageTitle, setImageTitle] = useState(product ? product.images[0] : '');

    if (!product) {
        return <span>Product not found</span>;
    }
    return (
        <section className={styles.product}>
            <div className={styles.product_image}>
                <div className={styles.secondary_images}>
                    {product.images.map((item) => (
                        <img
                            key={item}
                            className={`${styles.secondary_image} ${item === imageTitle ? styles.active_image : ''}`}
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
                <button className={styles.product_buy_button} onClick={() => handleAddToCart(product)}>
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
