import type { Producto } from "../../../types/Producto";
import { ProductoItem } from "../ProductoItem/ProductoItem";
import styles from "./ProductoItemList.module.css";
import { FaBoxOpen } from "react-icons/fa";

export function ProductoItemList({ productos, mensaje } : { productos: Producto[]; mensaje: string }) {
    return (
        <div className={styles.productListContainer}>
            <div className={styles.productListTitle}>
                <FaBoxOpen className={styles.productListIcon} />
                {mensaje}
            </div>
            <div className={styles.productGrid}>
                {productos.map(prod => (
                    <ProductoItem key={prod.id} producto={prod} />
                ))}
            </div>
        </div>
    );
}