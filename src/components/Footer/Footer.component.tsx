import { Socials } from '../Socials/Socials.component';
import styles from './footer.module.css';

export const Footer = () => (
    <footer className={styles.footer}>
        <hr className={styles.line}></hr>
        <div className={styles.footer__content}>
            <Socials />
            <h3 className={styles.copyright}>
                Made with 💗 on course{' '}
                <span className={styles.copyright__color}>&apos;Intro to React&apos; from Masters Academy in 2024</span> by Vasyl Biliak
            </h3>
        </div>
    </footer>
);
