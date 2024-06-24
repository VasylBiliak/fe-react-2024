import React from 'react';

import styles from './messages.module.css';

export function NoFoundMessage() {
    return (
        <div className={styles.message_wrapper}>
            <h2 className={styles.message_wrapper}>Sorry, no matches were found...</h2>
        </div>
    );
}
