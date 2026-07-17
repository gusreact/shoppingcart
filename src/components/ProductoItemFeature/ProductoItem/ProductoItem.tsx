import { useState } from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../../../hooks/useCart';
import type { Producto } from "../../../types/Producto";
import { Button, Card } from "react-bootstrap";

export function ProductoItem({ producto } : { producto: Producto }) {
    const { addToCart, removeProductoDelCarrito, isInCart, getQuantityById } = useCart();
    const cantidadProducto = isInCart(producto.id) ? getQuantityById(producto.id) : 0;
    const [cantidad, setCantidad] = useState(cantidadProducto);
    const [productoEnCarrito, setProductoEnCarrito] = useState<boolean | null>(isInCart(producto.id) ? true : false);

    const incrementar = () => {
        if (cantidad < producto.stock)
            setCantidad(cantidad + 1);
    };
    const decrementar = () => {
        if (cantidad > 0)
            setCantidad(cantidad - 1);
    };

    const handleAddToCart = () => {
        if(cantidad === 0){
            handleRemoveFromCart();
            return;
        }
        addToCart(producto, cantidad);
        alert(`Agregaste ${cantidad} unidades de ${producto.nombre} al carrito.`);
        setProductoEnCarrito(true);
    };

    const handleRemoveFromCart = () => {
        removeProductoDelCarrito(producto.id);
        alert(`Quitaste ${producto.nombre} del carrito.`);
        setProductoEnCarrito(false);
        setCantidad(0);
    };

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={producto.imagen} />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text>${producto.precio}</Card.Text>
                <Card.Text>Stock disponible: {producto.stock}</Card.Text>
                <Link to={`/productos-nacionales/${producto.id}`}>
                    <Button variant="primary" className="btn btn-primary mt-auto">
                        Ver detalle
                    </Button>
                </Link>
                <Button onClick={decrementar} className="btn btn-primary mt-auto">-</Button>
                {cantidad}
                <Button onClick={incrementar} className="btn btn-primary mt-auto">+</Button>
                <Button onClick={handleAddToCart} disabled={(cantidadProducto === 0 && cantidad === 0) || (cantidadProducto !== 0 && cantidadProducto === cantidad)} className="btn btn-primary mt-auto">
                    {productoEnCarrito ? `Actualizar ${cantidad} en el Carrito` : `Agregar ${cantidad} al Carrito`}
                </Button>
                {productoEnCarrito && (
                <Button onClick={handleRemoveFromCart} className="btn btn-danger mt-auto">
                    Eliminar
                </Button>
                )}
        </Card.Body>
        </Card>
    );
}