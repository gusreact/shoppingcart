import styles from "./Cart.module.css";
import { FaBoxOpen } from "react-icons/fa";
import { useCart } from '../../hooks/useCart';
import { ProductoItem } from "../ProductoItemFeature/ProductoItem/ProductoItem";

const Cart = ({ mensaje } : { mensaje: string }) => {
    const { cart } = useCart();

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div className={styles.productListContainer}>
                <div className={styles.productListTitle}>
                    <FaBoxOpen className={styles.productListIcon} />
                    {mensaje}
                </div>
                <div className={styles.productGrid}>
                    {cart.map(prod => (
                        <ProductoItem key={prod.id} producto={prod} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Cart;