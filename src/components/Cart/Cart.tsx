import React, { useState, FC } from 'react';
import { Button, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { decrement, increment } from '../../store/Slice';
import { Link } from 'react-router-dom';
import './cart.scss'



export const Cart: FC= () => {
  const foods = useAppSelector(state => state.clickSlice.modal)
  const allPrice = useAppSelector(state => state.clickSlice.price)
  const dispatch = useAppDispatch()
  

  return (
      <div className='cart-p'>
        <Link className='home' to='/'>На главную</Link>
        {
          foods.length > 0 ? 
          foods.map(food => {
            return (
              <div className='lists' key={food.description}>
                <div className='lists__img'>
                  <img src={food.url} alt='food' />
                </div>
                <div className='lists__block'>
                  <h3 className='lists__name'>{food.name}</h3>
                  <p className='lists__desc'>{food.description}</p>
                  <span className='lists__price'>{food.price}</span>
                </div>
                <div className='lists__click'>
                  <Button onClick={() => dispatch(increment(food.name))}>+</Button>
                    <span>{food.count}</span>
                  <Button onClick={() => dispatch(decrement(food.name))}>-</Button>
                </div>
              </div>
            )
          }):
          <Empty description='Корзина пуста'/>
        }
        <div className='cart-p__end'>
          <a href="https://wa.me/+77084574537" type='tel'>
            <div className="whatsapp-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
          </a>
          <h2>Итог: {allPrice}</h2>
        </div>
        
      </div>
  )
}