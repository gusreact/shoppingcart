import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

function Header() {
    const { getCartQuantity } = useCart();
    const cartQuantity = getCartQuantity();
    const { user, logout } = useAuth();
    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <nav className={styles.nav}>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos-nacionales">Productos Nacionales</Link></li>
                        <li><Link to="/admin/cupones">Gestión de Cupones</Link></li>
                        {user ? (
                            <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                                {user.rol === 'admin' && (<li><Link to="/productos">Gestion</Link></li>)}
                                <li><Link to="/perfil">Perfil</Link></li>
                                    <span>¡Hola, {user.email}!</span>
                                    <button onClick={logout}>Cerrar Sesión</button>
                            </>
                                ) : (
                                    <li><Link to="/login">Login</Link></li>
                                )}
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