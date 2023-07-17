import { FC } from 'react';
import { Modal } from 'antd';
import { ModalComponentProps } from '../../types/type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import './modal.scss'



export const ModalComponent: FC<ModalComponentProps> = ({isModalOpen, setIsModalOpen}) => {
  const food = useAppSelector(state => state.clickSlice.find)

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
        <div className='modal'>
          <h2>{food?.name}</h2>
          <img src={food?.url} alt="food" />
          <p>{food?.description}</p>
          <span>{food?.price}₸</span>
        </div>
      </Modal>
  )
}