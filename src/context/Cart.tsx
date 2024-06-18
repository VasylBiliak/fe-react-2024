import { createContext, useEffect, useState } from 'react';

import type { Product } from '@/interfaces/Product';

interface CartContextInterface {
    cartData: Product[];
    handleAddToCart: (item: Product) => void;
}

export const Cart = createContext<CartContextInterface>({
    cartData: [],
    handleAddToCart: () => {},
});

const CartKey = 'cart';

export function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [cartData, setCartData] = useState<Product[]>([]);

    useEffect(() => {
        const localCart = JSON.parse(localStorage.getItem(CartKey) || '[]');
        setCartData(localCart);
    }, []);

    const handleAddToCart = (item: Product) => {
        const updatedCart = [...cartData, item];
        localStorage.setItem(CartKey, JSON.stringify(updatedCart));
        setCartData(updatedCart);
    };

    const contextValue = {
        cartData,
        handleAddToCart,
    };

    return <Cart.Provider value={contextValue}>{children}</Cart.Provider>;
}
