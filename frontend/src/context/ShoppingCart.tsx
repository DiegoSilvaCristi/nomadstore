import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartContextType {
  cart: any;
  setCart: React.Dispatch<React.SetStateAction<any>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCartState] = useState<any>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartState(JSON.parse(storedCart));
    }
  }, []);

  const setCart = (newCart: any) => {
    localStorage.setItem('shoppingCart', JSON.stringify(newCart));
    setCartState(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}
