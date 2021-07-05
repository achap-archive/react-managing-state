import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Products from './Products';
import Detail from './Detail';
import Cart from './Cart';
import Checkout from './Checkout'
import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      JSON.parse(localStorage.getItem("cart"));
    } catch (err) {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart), [cart]));

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function emptyCart() {
    setCart([]);
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((i) => i.sku !== sku);
      }
      return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }

  return (
    <div>
      <div className='content'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path='/:category' element={<Products />} />
            <Route
              path='/:category/:id'
              element={<Detail addToCart={addToCart} />}
            />
            <Route path='/cart' element={<Cart cart={cart} />} />
            <Route path='/checkout' element={<Checkout cart={cart} emptyCart={emptyCart} /> } />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
