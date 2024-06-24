import React from 'react';

import styles from './messages.module.css';

export function LoadingMessage() {
    return (
        <div className={styles.message_wrapper}>
            <span className={styles.loader}></span>
        </div>
    );
}
