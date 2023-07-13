import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import { Categories } from '../../types/type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clickId } from '../../store/Slice';
import { ModalComponent } from '../Modal';
import { Button } from 'antd';
import './header.scss';
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'


export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [nav, setNav] = useState<Categories[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allPrice = useAppSelector(state => state.clickSlice.price)

  async function getCategories() {
    await axios
      .get<Categories[]>('http://localhost:3001/categories')
      .then((data) => setNav(data.data));
  }

  useEffect(() => {
    getCategories();
  }, []);

  
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <header className='header'>
      <Link to={'/'}><img
        src={'https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-design-creative-idea-logo-elements-2.png'}
        alt='logo'
      /></Link>
      <nav>
        <ul>
          {nav &&
            nav.map((item) => (
              <li className='header__list' onClick={() => dispatch(clickId(item.id))} key={item.id}>
                {item.name}
              </li>
            ))}
        </ul>
      </nav>
      <div className='header__cart'>
        <Link to={'/cart'}>
          <Button>
            <ShoppingCartOutlined style={{fontSize: 20}}/> {allPrice}₸
          </Button>
          </Link>
      </div>
      {/* <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
    </header>
  );
};
