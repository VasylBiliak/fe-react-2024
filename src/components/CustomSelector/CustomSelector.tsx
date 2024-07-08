import React, { useState } from 'react';

import IconArrowUp from '@/assets/icon/Icon_arrow_up.svg';
import type { Selector } from '@/interfaces/Selector';

import styles from './CustomSelector.module.css';

const selectors: Selector[] = [
    {
        title: 'Newest',
        selector: 'newest',
    },
    {
        title: 'Oldest',
        selector: 'oldest',
    },
];

interface CustomSelectorProps {
    setSort: (sort: string) => void;
}

function CustomSelector({ setSort }: CustomSelectorProps) {
    const [currentSelector, setCurrentSelector] = useState(selectors[0]);
    const [isOpen, setIsOpen] = useState(false);

    const menuSelectors = selectors.filter((item) => item.selector !== currentSelector.selector);

    function handleChangeSelector(selector: Selector['selector']) {
        const newSelector = selectors.find((item) => item.selector === selector)!;
        setCurrentSelector(newSelector);
        setSort(newSelector.selector);
        setIsOpen(false);
    }

    return (
        <div className={styles.selector_wraper}>
            <span className={styles.sort_by__text}>Sort by:</span>
            <menu className={`${styles.selector__menu} ${isOpen ? styles.selector__open : ''}`}>
                <button
                    className={`${styles.menu__btn} ${isOpen ? styles.menu__active_btn : ''}`}
                    onClick={() => setIsOpen((previous) => !previous)}
                >
                    {currentSelector.title}
                    <img src={IconArrowUp} className={isOpen ? styles.menu__icon_up : styles.menu__icon_down} alt="Icon arrow up" />
                </button>
                <div className={styles.selector__drop}>
                    {menuSelectors.map((item) => (
                        <button key={item.selector} onClick={() => handleChangeSelector(item.selector)}>
                            {item.title}
                        </button>
                    ))}
                </div>
            </menu>
        </div>
    );
}

export { CustomSelector };
