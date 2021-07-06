import React, { useReducer, useEffect, useContext } from 'react';
import cartReducer from './cartReducer';

const cartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem('cart'));
} catch (err) {
  console.error('The cart could not be parsed into JSON.');
  initialCart = [];
}

export function CartProvider(props) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart), [cart]));
  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <cartContext.Provider value={contextValue}>
      {props.children}
    </cartContext.Provider>
  );
}

// Custom hook to use cartContext
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider. Wrap a parent component in <CartProvider> to fix this error.'
    );
  }
  return context;
}
