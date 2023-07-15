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
              <div className='menu__block' key={food.description}>
                <div className='menu__img'>
                  <img src={food.url} alt='food' />
                </div>
                <div>
                  <h3 className='menu__name'>{food.name}</h3>
                  <span className='menu__price'>{food.price}</span>
                </div>
                <p className='menu__desc'>{food.description}</p>
                <div>
                  <Button onClick={() => dispatch(increment(food.name))}>+</Button>
                  <span>{food.count}</span>
                  <Button onClick={() => dispatch(decrement(food.name))}>-</Button>
                </div>
              </div>
            )
          }):
          <Empty description='Корзина пуста'/>
        }
        <h2>Сумма: {allPrice}</h2>
        <a href="https://wa.me/+77084579637" type='tel'>
        <div className="whatsapp-icon">
          <i className="fab fa-whatsapp"></i>
        </div>
        </a>
        
      </div>
  )
}