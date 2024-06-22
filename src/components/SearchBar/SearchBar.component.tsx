import React, { useState } from 'react';

import searchIcon from '@/assets/products/Search_Magnifying_Glass.svg';
import { CustomSelector } from '@/components/CustomSelector/CustomSelector';
import type { Category } from '@/interfaces/Category';

import styles from './SearchBar.module.css';

interface SearchBarProps {
    setFilter: (filter: string) => void;
    setSort: (sort: string) => void;
    setSearchQuery: (query: string) => void;
}

const categories: Readonly<Pick<Category, 'id' | 'name'>[]> = [
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Miscellaneous' },
];

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
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`${styles.filter__btn} ${selectedFilter === category.id.toString() ? styles.filters_btn_active : ''}`}
                        onClick={() => handleFilterChange(category.id.toString())}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <CustomSelector setSort={setSort} />
        </section>
    );
}
