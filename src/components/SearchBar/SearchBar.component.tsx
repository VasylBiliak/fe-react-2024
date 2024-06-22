import React, { useState } from 'react';

import searchIcon from '@/assets/products/Search_Magnifying_Glass.svg';
import { CustomSelector } from '@/components/CustomSelector/CustomSelector';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    setSearchQuery: (query: string) => void;
}

export function SearchBar({ setFilter, setSort, setSearchQuery }: SearchBarProps) {
    const [selectedFilter, setSelectedFilter] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');

    const handleFilterChange = (filterID: string) => {
        setSelectedFilter(filterID);
        return setFilter(filterID);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleSearchSubmit = () => {
        setSearchQuery(searchInput);
    };

    return (
        <section className={styles.filters_bar}>
            <form
                className={styles.filters_bar__search}
                onSubmit={(event) => {
                    event.preventDefault();
                    handleSearchSubmit();
                }}
            >
                <input type="text" placeholder="Search..." value={searchInput} onChange={handleSearchChange} />
                <button className={styles.filters_bar__btn} type="button" onClick={handleSearchSubmit}>
                    <img src={searchIcon} alt="Search" width="18px" height="18px" />
                </button>
            </form>

            <div className={styles.filters}>
                <button
                    className={`${styles.filter__btn} ${selectedFilter === '1' ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('1')}
                >
                    Shoes
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilter === '2' ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('2')}
                >
                    Electronics
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilter === '3' ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('3')}
                >
                    Furniture
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilter === '4' ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('4')}
                >
                    Clothes
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilter === '5' ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('5')}
                >
                    Miscellaneous
                </button>
            </div>
            <div className={styles.sort_by}>
                <span className={styles.sort_by__text}>Sort by:</span>
                <CustomSelector setSort={setSort} />
            </div>
        </section>
    );
}
