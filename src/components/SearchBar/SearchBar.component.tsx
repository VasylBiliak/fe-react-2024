import React, { useState } from 'react';

import searchIcon from '@/assets/products/Search_Magnifying_Glass.svg';
import { CustomSelector } from '@/components/CustomSelector/CustomSelector';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    setSearchQuery: (query: string) => void;
}

function SearchBar({ setFilter, setSort, setSearchQuery }: SearchBarProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [searchInput, setSearchInput] = useState<string>('');

    const handleFilterChange = (filter: string) => {
        setSelectedFilters((previousFilters) =>
            previousFilters.includes(filter) ? previousFilters.filter((f) => f !== filter) : [...previousFilters, filter],
        );
        setFilter(filter);
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
                    className={`${styles.filter__btn} ${selectedFilters.includes('Electronics') ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('Electronics')}
                >
                    Electronics
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilters.includes('Shoes') ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('Shoes')}
                >
                    Shoes
                </button>
                <button
                    className={`${styles.filter__btn} ${selectedFilters.includes('Clothes') ? styles.filters_btn_active : ''}`}
                    onClick={() => handleFilterChange('Clothes')}
                >
                    Clothes
                </button>
            </div>
            <div className={styles.sort_by}>
                <span className={styles.sort_by__text}>Sort by:</span>
                <CustomSelector setSort={setSort} />
            </div>
        </section>
    );
}

export { SearchBar };
