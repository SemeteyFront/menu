import React, { useState, FC } from 'react';
import { Modal, Button, Empty } from 'antd';
import { ModalComponentProps } from '../../types/type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { decrement, increment } from '../../store/Slice';
import './modal.scss'



export const ModalComponent: FC<ModalComponentProps> = ({isModalOpen, setIsModalOpen}) => {
  const foods = useAppSelector(state => state.clickSlice.modal)
  const allPrice = useAppSelector(state => state.clickSlice.price)
  const dispatch = useAppDispatch()
  

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
      <Modal title="Корзина" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h2>Сумма: {allPrice}</h2>
        {
          foods ? 
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
                <div>
                  <Button onClick={() => dispatch(increment(food.name))}>+</Button>
                  <span>{food.count}</span>
                  <Button onClick={() => dispatch(decrement(food.name))}>-</Button>
                </div>
              </div>
            )
          }):
          <Empty description={false} />
        }
      </Modal>
  )
}