import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import darkIcon from '@/assets/header/dark_active.svg';
import divider from '@/assets/header/divider.svg';
import lightIcon from '@/assets/header/light_active.svg';
import { Theme } from '@/interfaces/Theme';
import { selectTheme, setTheme } from '@/store/theme/slice';

import styles from './ThemeSwitcher.module.css';

const htmlElement = document.querySelector('html');

export function ThemeSwitcher() {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme) as Theme;

    useEffect(() => {
        if (typeof theme === 'string') {
            htmlElement!.dataset.theme = theme;
        }
    }, [theme]);

    const onLightClick = () => {
        dispatch(setTheme(Theme.LIGHT));
        localStorage.setItem('theme', Theme.LIGHT);
    };

    const onDarkClick = () => {
        dispatch(setTheme(Theme.DARK));
        localStorage.setItem('theme', Theme.DARK);
    };

    return (
        <div className={styles.themes} title="Theme switcher">
            <button
                className={`${styles.themes__btn} ${theme === Theme.LIGHT ? styles.theme_active : ''}`}
                title="Light theme"
                onClick={onLightClick}
            >
                <img src={lightIcon} alt="light theme" width="20px" height="20px" />
            </button>
            <img src={divider} alt="divider" width="20px" height="20px" />
            <button
                className={`${styles.themes__btn} ${theme === Theme.DARK ? styles.theme_active : ''}`}
                title="Dark theme"
                onClick={onDarkClick}
            >
                <img src={darkIcon} alt="dark theme" width="20px" height="20px" />
            </button>
        </div>
    );
}
