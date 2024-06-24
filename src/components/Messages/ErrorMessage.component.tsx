import React from 'react';

import styles from './messages.module.css';

export function ErrorMessage() {
    return (
        <div className={styles.message_wrapper}>
            <h2 className={styles.message_wrapper}>Product not found</h2>;
        </div>
    );
}
