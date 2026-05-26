import React, { useState } from 'react';
import type { Producto } from './types/Producto';
import { CartContext } from './context/CartContext';
import { useLocation } from 'react-router-dom';

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const location = useLocation();
    const [cart, setCart] = useState<Producto[]>([]);
    const addToCart = (product: Producto, quantity: number) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updatedCart: Producto[] = cart.map((item: Producto) =>
                item.id === product.id
                ? { ...item, quantity: location.pathname === '/carrito' || location.pathname === `/producto/${product.id}` || location.pathname === '/productos' ? quantity : item.quantity + quantity }
                : item
            );
            setCart(updatedCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, quantity }]);
        }
    };
    const clearCart = () => {
        setCart([]);
    };
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
    };
    const removeProductoDelCarrito = (productId: number) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart,
        getCartQuantity, getCartTotal, removeProductoDelCarrito }}>
        {children}
        </CartContext.Provider>
    );
};