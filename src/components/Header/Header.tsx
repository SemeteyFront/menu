import { useState, useEffect, FC } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { Categories } from '../../types/type';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clickId } from '../../store/Slice';
import { ModalComponent } from '../Modal';
import { Button } from 'antd';
import './header.scss';
import { Link } from 'react-router-dom';

const categories = [
  {
    "id": 1,
    "name": "Стейки"
  },
  {
    "id": 2,
    "name": "Салаты"
  },
  {
    "id": 3,
    "name": "Теплые салаты"
  },
  {
    "id": 4,
    "name": "Супы"
  },
  {
    "id": 5,
    "name": "Десерты"
  }
]

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [nav, setNav] = useState<Categories[]>(categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allPrice = useAppSelector(state => state.clickSlice.price)
  const [isMenu, setIfMenu] = useState<boolean>(false);
  const price = useAppSelector(state => state.clickSlice.price)

  const handleClick = (id: number) => {
    dispatch(clickId(id))
    setIfMenu(false)
    
  }

  

  // async function getCategories() {
  //   await axios
  //     .get<Categories[]>('http://localhost:3001/categories')
  //     .then((data) => setNav(data.data));
  // }

  // useEffect(() => {
  //   getCategories();
  // }, []);

  
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  return (
    <header className='header'>
      <Link className='logo1' to={'/'}><img
          src={'https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-design-creative-idea-logo-elements-2.png'}
          alt='logo'
        /></Link>
      <ul className={isMenu ? "menu-list active" : "menu-list"}>
        <Link className='logo 2' to={'/'}><img
          src={'https://www.freepnglogos.com/uploads/coffee-logo-png/coffee-logo-design-creative-idea-logo-elements-2.png'}
          alt='logo'
        /></Link>
        {nav &&
          nav.map((item) => (
            <li onClick={() => handleClick(item.id)} key={item.id}>
              {item.name}
            </li>
          ))}
      </ul>
      
      <div onClick={() => setIfMenu(!isMenu)} className="mobile_btn">
            {isMenu ? <CloseOutlined size={25} /> : <MenuOutlined size={25} />}
          </div>
      {/* <ModalComponent isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> */}
    </header>
  );
};
