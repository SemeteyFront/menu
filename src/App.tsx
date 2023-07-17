import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './components/Cart';
import { Burger } from './components/Burger';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Menu/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/burger' element={<Burger/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
