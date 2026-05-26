import { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import type { Producto } from "../../../types/Producto";

export function ProductoItem({ producto } : { producto: Producto }) {
    const [cantidad, setCantidad] = useState(producto.quantity || 0);
    const [favorito, setFavorito] = useState(false);
    const { addToCart, removeProductoDelCarrito } = useCart();
    const [productoEnCarrito, setProductoEnCarrito] = useState<boolean | null>(producto.quantity > 0 ? true : false);

    const incrementar = () => {
        if (cantidad < producto.stock)
            setCantidad(cantidad + 1);
    };
    const decrementar = () => {
        if (cantidad > 0)
            setCantidad(cantidad - 1);
    };

    const handleAddToCart = () => {
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
        setProductoEnCarrito(true);
    };

    const handleRemoveFromCart = () => {
        removeProductoDelCarrito(producto.id);
        alert(`Quitaste ${producto.nombre} del carrito.`);
        setProductoEnCarrito(false);
    };

    return (
        <div className="card-producto">
            <img src={producto.imagen} alt={producto.nombre} width={100} height={100} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <p>Stock disponible: {producto.stock}</p>
            <Link to={`/producto/${producto.id}`}>Ver detalle</Link>
            <p>
                <button onClick={decrementar}>-</button>
                {cantidad}
                <button onClick={incrementar}>+</button>
            </p>
            {productoEnCarrito && cantidad === 0 ? (
                <button onClick={handleRemoveFromCart}>
                    Quitar producto del carrito
                </button>
            ) : (
                <button onClick={handleAddToCart}>
                    {productoEnCarrito ? `Actualizar ${cantidad} en el Carrito` : `Agregar ${cantidad} al Carrito`}
                </button>
            )}
            
            <span onClick={() => setFavorito(!favorito)}
                style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '10px' }}>
                {favorito ? '⭐' : '☆'}
            </span>
        </div>
    );
}