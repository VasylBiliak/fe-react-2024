import React, { useContext } from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import cart from '@/assets/header/cart.svg';
import loginImg from '@/assets/header/login.svg';
import menu from '@/assets/header/Menu_Duo_LG.svg';
import userAdd from '@/assets/header/user_add.svg';
import logo from '@/assets/logo.svg';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher.component';
import { Cart } from '@/context/Cart';
import { Component } from '@/interfaces/Component';

import styles from './header.module.css';

export function Header() {
    const { cartData } = useContext(Cart);
    const productsMatchUrl = useMatch(`${Component.PRODUCTS}`);

    return (
        <header className={styles.header}>
            <img className={styles.header__logo} src={logo} alt="logo" width="40px" height="40px" />
            <ThemeSwitcher />
            <nav className={styles.header__links}>
                <NavLink to="" className={productsMatchUrl ? styles.header__link : styles.header__link_active}>
                    About
                </NavLink>
                <NavLink to={Component.PRODUCTS} className={productsMatchUrl ? styles.header__link_active : styles.header__link}>
                    Products
                </NavLink>
                <button className={`${styles.wrapper_cart} ${styles.cart__link}`} title="Cart">
                    <img src={cart} alt="Cart" width="24px" height="24px" />
                    {cartData && cartData.length > 0 && <span className={styles.product_quantity}>{cartData.length}</span>}
                </button>
                <button className={styles.header__login_btn}>
                    <img src={loginImg} alt="login Img" className={styles.login_img} />
                    <span className={styles.header_btn__text}>Login</span>
                </button>
                <button className={styles.header_btn__user_add}>
                    <img src={userAdd} alt="Add user" className={styles.user_add_img} />
                    <span className={styles.header_btn__text}> Sign up</span>
                </button>
                <NavLink to={Component.MENU} className={styles.header__menu_btn}>
                    <img src={menu} alt="Menu" className={styles.menu_img} />
                </NavLink>
            </nav>
        </header>
    );
}
