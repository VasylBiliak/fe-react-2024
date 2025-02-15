import picture from '../../assets/about/aboutIMG.svg';
import styles from './about.module.css';

export function AboutPage() {
    return (
        <section className={styles.content}>
            <img src={picture} alt="About" className={styles.picture} />
            <h1 className={styles.title}>About me</h1>
            <div className={styles.description}>
                <p>
                    Hi! My name is Vasyl and I&apos;m a Junior Frontend Developer. I am already familiar with main Web Technologies like
                    like React, HTML, CSS, JavaScript and Git version control system.
                </p>
                <p>This page was developed during the course &apos;Intro to React&apos; from Masters Academy in 2024.</p>

                <p>
                    This is a social project from MOCG company where I got an opportunity to work with Frontend mentors and to create my
                    create my own small project for the portfolio.
                </p>

                <p>
                    You can contact me via{' '}
                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                        {' '}
                        Linkedin
                    </a>{' '}
                    and check out my
                    <a href="https://github.com/VasylBiliak" rel="noreferrer">
                        {' '}
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </section>
    );
}
