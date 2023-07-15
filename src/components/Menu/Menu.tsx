import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Button, Empty } from 'antd';
import { getMenu } from '../../store/async';
import './menu.scss';
import { addModal, decrement } from '../../store/Slice';
import { Link } from 'react-router-dom';
import { Header } from '../Header';
import { ShoppingCartOutlined } from '@ant-design/icons'


export const Menu = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.clickSlice.filters);
  const price = useAppSelector((state) => state.clickSlice.price);

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  console.log(filters);


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
                    <img  src={item.url} alt='food' />
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
            <Empty description='Зоя говорит блюд нет!' />
          }
      </div>
    </>
  );
};
