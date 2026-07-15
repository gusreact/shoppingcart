import styles from "./Cart.module.css";
import { FaBoxOpen } from "react-icons/fa";
import { useCart } from '../../hooks/useCart';
import { ProductoItem } from "../ProductoItemFeature/ProductoItem/ProductoItem";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, clearCart, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div>
                <h1>El carrito está vacío</h1>
                <p>Agregá productos para continuar la compra.</p>
                <Link to="/productos-nacionales" className="btn-volver">
                    Ver Productos
                </Link>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div className={styles.productListContainer}>
                <div className={styles.productListTitle}>
                    <FaBoxOpen className={styles.productListIcon} />
                    ("Productos en el carrito")
                </div>
                <div className={styles.productGrid}>
                    {cart.map(prod => (
                        <ProductoItem key={prod.id} producto={prod} />
                    ))}
                </div>
                <hr />
                <h3>Total a pagar: ${getCartTotal()}</h3>
                <button onClick={clearCart} className="btn-vaciar">Vaciar Carrito</button>
                <Link to="/" onClick={()=>alert("Gracias por comprar")}className="btn-finalizar">
                    Finalizar Compra
                </Link>
            </div>
        </div>
    );
};
export default Cart;