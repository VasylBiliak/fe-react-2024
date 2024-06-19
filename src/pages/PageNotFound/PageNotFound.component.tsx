import { Link } from 'react-router-dom';

import styles from './pageNotFound.module.css';

export const PageNotFound = () => (
    <section className={styles.error_text}>
        <h2 className={styles.error_text__title}>Page Not Found</h2>
        <h3 className={styles.error_text__subtitle}>Sorry, the page you are looking for does not exist.</h3>
        <span className={styles.error_text__sad_face}>(╯︵╰,)</span>
        <span className={styles.error_text__additional_info}>Error code: 404</span>
        <Link className={styles.back_button} to={'/'}>
            Go back to Home
        </Link>
    </section>
);
