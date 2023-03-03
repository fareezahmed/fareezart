import Link from 'next/link';
import styles from '@/styles/Home.module.css'

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Raaz</h1>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/register">Register</Link>
                </li>
                <li>
                    <Link href="/account">Account</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;