import styles from './styles.module.css';
import Logo from '../../assets/logo.svg';

export function Header() {
    return (
        <header className={styles.container}>
            <img src={Logo} alt="" />
        </header>
    )
}