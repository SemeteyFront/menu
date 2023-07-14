import React, { useState } from 'react';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import './burger.scss';

export const Burger = () => {
  const [nav, setNav] = useState<boolean>(false);
  return(
    <header className="headerr">
      <div className="container">
        <div className="box">
          <div className="logo_image">
            <img src="https://www.freepnglogos.com/uploads/html5-logo-png/html5-logo-html-logo-0.png" alt='/' />
          </div>
          <ul
            className={
              nav ? "menu active" : "menu"
            }
          >
            <li>
              <a href='##'>Product</a>
            </li>
            <li>
              <a href='##'>Zoya</a>
            </li>
            <li>
              <a href='##'>Customers</a>
            </li>
            <li>
              <a href='##'>Price</a>
            </li>
            <li>
              <a href='##'>Contacts</a>
            </li>
          </ul>
          <div onClick={() => setNav(!nav)} className="mobile_btn">
            {nav ? <CloseOutlined size={25} /> : <MenuOutlined size={25} />}
          </div>
        </div>
      </div>
    </header>
  );
};