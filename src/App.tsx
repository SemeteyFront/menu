import React from 'react';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { Route, Routes } from 'react-router-dom';
import { Cart } from './components/Cart';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Menu/>} />
        <Route path='/cart' element={<Cart/>} />
      </Routes>
    </div>
  );
}

export default App;
