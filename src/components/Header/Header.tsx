import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useCart } from '../../hooks/useCart';

function Header() {
    const { getCartQuantity } = useCart();
    const cartQuantity = getCartQuantity();
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <nav className={styles.nav}>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/alta">Alta de producto</Link></li>
                    </ul>
                </nav>
                <Link to="/carrito">
                    <div className={styles.cartContainer}>
                        <svg className={styles.cartIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        <span className={styles.cartBadge}>{cartQuantity}</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}
export default Header;