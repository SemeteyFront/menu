import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Button, Empty } from 'antd';
import { getMenu } from '../../store/async';
import './menu.scss';
import { addModal, decrement, findObjects } from '../../store/Slice';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { ShoppingCartOutlined } from '@ant-design/icons'
import { ModalComponent } from '../Modal';


export const Menu = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filters = useAppSelector((state) => state.clickSlice.filters);
  const price = useAppSelector((state) => state.clickSlice.price);

  const showModal = (description: string) => {
    dispatch(findObjects(description))
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(getMenu());
  }, [dispatch]);


  return (
    <>
      <Header/>
      {
        price > 0 ?
      <Link className='cart' to={'/cart'}>
        <ShoppingCartOutlined className='fixed' /> <span>{price}₸</span>
      </Link> 
      :
      null
      }
      <div className='menu'>
        { filters.length > 0 ?
          filters.map((item) => {
              return (
                <div className='menu__block' key={item.description}>
                  <div className='menu__img'>
                    <img  src={item.url} alt='food' onClick={() => showModal(item.description)} />
                  </div>
                  <div className='menu__two'>
                    <div className='menu__info'>
                      <h3 className='menu__name'>{item.name}</h3>
                      <p className='menu__desc'>{item.description}</p>
                      <span className='menu__price'>{item.price}₸</span>
                    </div>
                    <div className='menu__click'>
                        <div className='div'>
                          <Button onClick={() => dispatch(addModal(item.name))}>+</Button>
                        </div>
                        {
                          item.count > 0 ? <div className='div'><span>{item.count}</span><Button onClick={() => dispatch(decrement(item.name))}>-</Button></div> : null
                        }
                      </div>
                  </div>
                </div>
              );
            }) :
            <Empty description='Блюд нет!' />
          }
      <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
      </div>
    </>
  );
};
