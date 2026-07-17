import React, { useState } from 'react';
import type { Producto } from '../types/Producto';
import { CartContext } from '../context/CartContext';

type CartProviderProps = {
    children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<Producto[]>([]);
    const addToCart = (product: Producto, cantidad: number) => {
        setCart(prevCart => {
            const itemInCart = prevCart.find(item => item.id === product.id);

            if (itemInCart) {
                return prevCart.map((item: Producto) =>
                    item.id === product.id
                        ? { ...item, cantidad }
                        : item
                );
            }

            return [...prevCart, { ...product, cantidad }];
        });
    };
    const clearCart = () => {
        setCart([]);
    };
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    };
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };
    const removeProductoDelCarrito = (productId: string) => {
        setCart(cart.filter(item => item.id !== productId));
    };
    const isInCart = (productId: string) => {
        return cart.some(item => item.id === productId);
    };
    const getQuantityById = (productId: string) => {
        const item = cart.find(item => item.id === productId);
        return item ? item.cantidad : 0;
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart,
        getCartQuantity, getCartTotal, removeProductoDelCarrito, isInCart, getQuantityById }}>
        {children}
        </CartContext.Provider>
    );
};