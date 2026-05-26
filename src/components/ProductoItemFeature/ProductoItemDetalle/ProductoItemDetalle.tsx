import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Producto } from '../../../types/Producto';
import { ProductoItem } from '../ProductoItem/ProductoItem';
import { useCart } from '../../../hooks/useCart';

const ProductoItemDetalle = () => {
    const { id } = useParams<{ id: string }>();
    const [producto, setProducto] = useState<Producto | null>(null);
    const { cart } = useCart();

    useEffect(() => {
        if (!id) return;
        fetch('/data/productos.json')
            .then(response => response.json())
            .then(data => {
                const productoEncontradoEnCarrito = cart.find(item => item.id === parseInt(id || '0'));
                if (productoEncontradoEnCarrito) {
                    setProducto(productoEncontradoEnCarrito);
                    return;
                }
                const productoEncontrado = data.find((p: Producto) => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.error("Error al cargar el producto:", error));
    }, [id, cart]);

    if (!producto) {
        return <h2>Cargando detalle del producto...</h2>;
    }
    if (!producto.id) {
        return <h2>Producto no encontrado.</h2>;
    }

    return (
        <div>
            <h2>Detalle del Producto: {producto.nombre}</h2>
            <ProductoItem key={producto.id} producto={producto} />
        </div>
    );
};
export default ProductoItemDetalle;