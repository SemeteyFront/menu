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
        gAfkjdfsdyfklj
      </Modal>
  )
}