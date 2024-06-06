import React from 'react';

import arrowIcon from '@/assets/icon/Icon_arrow_up.svg';
import type { PaginationProps } from '@/interfaces/Pagination';

import styles from './pagination.module.css';

const getPagination = (page: number, totalPages: number): number[] => {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
        const startPage = Math.max(2, page - 1);
        const endPage = Math.min(totalPages - 1, page + 1);

        if (page < 2) {
            return [1, 2, 3, -1, totalPages];
        } else if (page <= 3) {
            return [1, 2, 3, 4, -1, totalPages];
        } else if (page >= totalPages - 1) {
            return [1, -1, totalPages - 1, totalPages];
        } else if (page >= totalPages - 2) {
            return [1, -1, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [1, -1, startPage, page, endPage, -1, totalPages];
        }
    }
};

export const Pagination: React.FC<PaginationProps> = ({ page, limit, total, setCurrentPage }) => {
    const totalPages = Math.ceil(total / limit);
    if (totalPages === 0) {
        return <></>;
    }

    const currentPage = page > totalPages ? 0 : page;

    const setPreviousPage = (pageNumber: number) => setCurrentPage(pageNumber <= 1 ? 1 : pageNumber - 1);
    const setNextPage = (pageNumber: number) => setCurrentPage(pageNumber >= totalPages ? totalPages : pageNumber + 1);

    return (
        <nav className={styles.pagination__wrapper}>
            <ul className={styles.pagination__list}>
                <li>
                    <button
                        className={`${styles.pagination__button} ${styles.pagination__button_arrow}`}
                        onClick={() => setPreviousPage(currentPage)}
                        disabled={currentPage === 1}
                    >
                        <img
                            className={`${styles.pagination__arrow_left} ${page === 1 ? styles.pagination__arrow_inactive : ''}`}
                            src={arrowIcon}
                            alt="Icon arrow left"
                            width="18px"
                            height="18px"
                        />
                    </button>
                </li>
                {getPagination(currentPage, totalPages).map((pageNumber, index) => (
                    <li key={index}>
                        {pageNumber === -1 ? (
                            <span className={`${styles.pagination__button} ${styles.pagination__button_empty}`}>...</span>
                        ) : (
                            <button
                                className={`${styles.pagination__button} ${pageNumber === currentPage ? styles.pagination__button_active : ''}`}
                                onClick={() => setCurrentPage(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        )}
                    </li>
                ))}
                <li>
                    <button
                        className={`${styles.pagination__button} ${styles.pagination__button_arrow}`}
                        onClick={() => setNextPage(currentPage)}
                        disabled={currentPage === totalPages}
                    >
                        <img
                            className={`${styles.pagination__arrow_right} ${page === totalPages ? styles.pagination__arrow_inactive : ''}`}
                            src={arrowIcon}
                            alt="Icon arrow right"
                            width="18px"
                            height="18px"
                        />
                    </button>
                </li>
            </ul>
        </nav>
    );
};
