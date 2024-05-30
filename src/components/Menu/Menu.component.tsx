import { useState } from 'react';

import darkIcon from '@/assets/header/dark_active.svg';
import divider from '@/assets/header/divider.svg';
import lightIcon from '@/assets/header/light_active.svg';
import { Component } from '@/interfaces/Component';
import { Theme } from '@/interfaces/Theme';

import styles from './Menu.module.css';

interface HeaderProps {
    onChangeComponent: (component: Component) => void;
    activeComponent: Component;
}

const htmlElement = document.querySelector('html');
const isLightTheme = window.matchMedia('(prefers-color-scheme: light)').matches;

export function MenuContent({ onChangeComponent, activeComponent }: HeaderProps) {
    let initialTheme: Theme;
    if (localStorage.getItem('theme')) {
        initialTheme = localStorage.getItem('theme') as Theme;
    } else {
        initialTheme = isLightTheme ? Theme.LIGHT : Theme.DARK;
    }

    const [theme, setTheme] = useState<Theme>(initialTheme);
    htmlElement!.dataset.theme = theme;

    function handleChangeTheme(themeText: Theme) {
        setTheme(themeText);
        localStorage.setItem('theme', themeText);
    }
    return (
        <section className={styles.wrapper_menu}>
            <nav className={styles.list_links}>
                <button
                    className={activeComponent === Component.ABOUT ? styles.list_link_active : styles.list_btn}
                    onClick={() => onChangeComponent(Component.ABOUT)}
                >
                    <span className={styles.list_btn__text}>About</span>
                </button>
                <button
                    className={activeComponent === Component.PRODUCTS ? styles.list_link_active : styles.list_btn}
                    onClick={() => onChangeComponent(Component.PRODUCTS)}
                >
                    <span className={styles.list_btn__text}>Products</span>
                </button>
                <button className={styles.list_btn}>
                    <span className={styles.list_btn__text}>Login</span>
                </button>
                <button className={styles.list_btn}>
                    <span className={styles.list_btn__text}> Sign up</span>
                </button>
                <div className={styles.themes} title="Theme switcher">
                    <button
                        className={`${styles.themes__btn} ${theme === Theme.LIGHT ? styles.theme_active : ''}`}
                        title="Light theme"
                        onClick={() => handleChangeTheme(Theme.LIGHT)}
                    >
                        <img src={lightIcon} alt="light theme" width="20px" height="20px" />
                    </button>
                    <img src={divider} alt="divider" width="20px" height="20px" />
                    <button
                        className={`${styles.themes__btn} ${theme === Theme.DARK ? styles.theme_active : ''}`}
                        title="Dark theme"
                        onClick={() => handleChangeTheme(Theme.DARK)}
                    >
                        <img src={darkIcon} alt="dark theme" width="20px" height="20px" />
                    </button>
                </div>
            </nav>
        </section>
    );
}
