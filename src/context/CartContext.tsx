import { createContext } from 'react';
import type { Producto } from '../types/Producto';

type CartContextValue = {
    cart: Producto[];
    addToCart: (product: Producto, quantity: number) => void;
    clearCart: () => void;
    getCartQuantity: () => number;
    getCartTotal: () => number;
    removeProductoDelCarrito: (productId: string) => void;
    isInCart: (productId: string) => boolean;
    getQuantityById: (productId: string) => number;
};

export const CartContext = createContext<CartContextValue | undefined>(undefined);

