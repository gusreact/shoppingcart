import { useState, useEffect } from 'react';
import { ProductoItemList } from '../ProductoItemList/ProductoItemList';
import { useCart } from '../../../hooks/useCart';

export function ProductoItemContainer({ Mensaje } : { Mensaje: string }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);
    const { cart } = useCart();

    useEffect(() => {
        fetch('/data/productos.json')
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error('No se pudo cargar la información de los productos');
            }
            return respuesta.json();
        })
        .then((datos) => {
            const datosConCarrito = datos.map((producto: { id: number }) => {
                const productoEnCarrito = cart.find((item) => item.id === producto.id);
                if (productoEnCarrito) {
                    return {...producto, quantity: productoEnCarrito.quantity };
                }
                return producto;
            });
            setProductos(datosConCarrito);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setCargando(false);
     });
    }, [cart]);
    
    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
            <ProductoItemList productos={productos} mensaje={Mensaje} />
        </div>
    );
}